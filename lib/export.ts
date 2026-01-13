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
    const node = document.getElementById(elementId)
    if (!node) {
        console.error(`Export error: Node with ID '${elementId}' not found`)
        alert('Export failed: Content area not found.')
        return
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const pixelRatio = isMobile ? 2 : 3

    try {
        // 1. Ensure all images are fully loaded and decoded
        const images = Array.from(node.querySelectorAll('img'))
        await Promise.all(images.map(async (img) => {
            if (!img.complete) {
                await new Promise((resolve) => {
                    img.onload = resolve
                    img.onerror = resolve
                })
            }
            // Force browser to decode the image to ensure it's ready for canvas capture
            try {
                await img.decode()
            } catch (e) {
                console.warn('Image decode failed, proceeding anyway:', img.src)
            }
        }))

        // 2. Small delay for fonts and complex styles to settle
        await new Promise(resolve => setTimeout(resolve, 500))

        // 3. Capture Live Node
        const dataUrl = await toPng(node, {
            quality: 1.0,
            pixelRatio: pixelRatio,
            skipFonts: false,
            cacheBust: true,
            backgroundColor: '#ffffff',
            // Increase the range for capturing elements that might be just outside current scroll
            // but visible in the component container.
        })

        // 4. Trigger Download
        const link = document.createElement('a')
        link.href = dataUrl
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
        link.download = `${fileName}-${timestamp}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

    } catch (error) {
        console.error('Export failed:', error)
        alert('Export failed. Please try again or check your browser permissions.')
    }
}
