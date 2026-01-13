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
        return
    }

    try {
        // Clone the node so we don't mess up the live UI
        const node = originalNode.cloneNode(true) as HTMLElement
        node.style.position = 'fixed'
        node.style.top = '-9999px'
        node.style.left = '-9999px'
        node.style.width = originalNode.offsetWidth + 'px'
        node.style.height = originalNode.offsetHeight + 'px'
        document.body.appendChild(node)

        // Find all images in the clone and convert them to Data URLs
        const images = Array.from(node.querySelectorAll('img'))
        await Promise.all(images.map(async (img) => {
            const originalSrc = img.src
            if (originalSrc && !originalSrc.startsWith('data:')) {
                try {
                    const dataUrl = await imageToDataUrl(originalSrc)
                    img.src = dataUrl

                    // Wait for the new src to be loaded and decoded
                    await new Promise((resolve) => {
                        if (img.complete) {
                            img.decode().then(resolve).catch(resolve)
                        } else {
                            img.onload = () => img.decode().then(resolve).catch(resolve)
                            img.onerror = () => resolve(null)
                        }
                    })
                } catch (err) {
                    console.warn('Failed to convert image for export:', originalSrc, err)
                }
            }
        }))

        // Allow any extra assets/fonts to settle
        await new Promise(resolve => setTimeout(resolve, 300))

        const dataUrl = await toPng(node, {
            quality: 1.0,
            pixelRatio: 3, // Higher ratio for crisper exports on high-res mobile screens
            skipFonts: false,
            cacheBust: true,
            backgroundColor: '#ffffff',
        })

        // Clean up the clone
        document.body.removeChild(node)

        // Standard download logic
        const link = document.createElement('a')
        link.href = dataUrl
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
        link.download = `${fileName}-${timestamp}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

    } catch (error) {
        console.error('Export failed:', error)
        // Fallback cleanup if node was added
        const nodes = document.querySelectorAll('[style*="position: fixed; top: -9999px"]')
        nodes.forEach(n => n.remove())
    }
}
