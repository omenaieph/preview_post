import { toPng } from 'html-to-image'

async function imageToDataUrl(url: string): Promise<string> {
    if (url.startsWith('data:')) return url

    try {
        // If it's a local Blob, we can fetch it directly
        // Otherwise, route through our API proxy to bypass CORS
        const isBlob = url.startsWith('blob:')
        const isExternal = url.startsWith('http') && !url.includes(window.location.host)
        const fetchUrl = (isExternal && !isBlob) ? `/api/proxy?url=${encodeURIComponent(url)}` : url

        const response = await fetch(fetchUrl)
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`)
        const blob = await response.blob()
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })
    } catch (error) {
        console.error('Error converting image to data URL:', error)
        return url
    }
}

export async function exportAsImage(elementId: string, fileName: string) {
    const originalNode = document.getElementById(elementId)
    if (!originalNode) {
        console.error(`Export error: Node with ID '${elementId}' not found`)
        alert('Export failed: Content area not found.')
        return
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const pixelRatio = isMobile ? 2 : 3

    let clone: HTMLElement | null = null

    try {
        // 1. Clone the node
        clone = originalNode.cloneNode(true) as HTMLElement

        // 2. Hide the clone but keep it in the tree to preserve CSS variable inheritance (Tailwind v4)
        clone.style.position = 'absolute'
        clone.style.top = '-9999px'
        clone.style.left = '-9999px'
        clone.style.width = originalNode.offsetWidth + 'px'
        clone.style.height = originalNode.offsetHeight + 'px'
        clone.style.visibility = 'hidden'
        clone.style.pointerEvents = 'none'

        // Append near the original node to inherit same style context if scoped
        originalNode.parentElement?.appendChild(clone)

        // 3. Bake all images into Data URLs to bypass CORS and ensure capture
        const images = Array.from(clone.querySelectorAll('img'))
        await Promise.all(images.map(async (img) => {
            const src = img.getAttribute('src')
            if (src && !src.startsWith('data:')) {
                try {
                    const dataUrl = await imageToDataUrl(src)
                    img.src = dataUrl
                    // Wait for image to re-initialize
                    await new Promise((resolve) => {
                        if (img.complete) resolve(null)
                        else {
                            img.onload = () => resolve(null)
                            img.onerror = () => resolve(null)
                        }
                    })
                } catch (e) {
                    console.warn('Failed to bake image:', src, e)
                }
            }
        }))

        // 4. Final render delay
        await new Promise(resolve => setTimeout(resolve, 500))

        const dataUrl = await toPng(clone, {
            quality: 1.0,
            pixelRatio: pixelRatio,
            skipFonts: false,
            cacheBust: true,
            backgroundColor: '#ffffff',
        })

        // 5. Download
        const link = document.createElement('a')
        link.href = dataUrl
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
        link.download = `${fileName}-${timestamp}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

    } catch (error) {
        console.error('Export failed:', error)
        alert('Export failed. Please try again.')
    } finally {
        // 6. Cleanup clone
        if (clone && clone.parentElement) {
            clone.parentElement.removeChild(clone)
        }
    }
}
