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
        return
    }

    try {
        // Find all images and ensure they are converted to Data URLs in-place 
        // to avoid cloning issues (cloning often breaks styles or image paths)
        const images = Array.from(node.querySelectorAll('img'))
        await Promise.all(images.map(async (img) => {
            if (img.src && !img.src.startsWith('data:')) {
                const dataUrl = await imageToDataUrl(img.src)
                img.src = dataUrl

                await new Promise((resolve) => {
                    if (img.complete) resolve(null)
                    else {
                        img.onload = () => resolve(null)
                        img.onerror = () => resolve(null)
                    }
                })
            }
        }))

        // Wait a bit for the browser to repaint after SRC changes
        await new Promise(resolve => setTimeout(resolve, 200))

        const dataUrl = await toPng(node, {
            quality: 1.0,
            pixelRatio: 2, // 2 is usually enough for high quality without being too heavy
            cacheBust: true,
            backgroundColor: '#ffffff', // Ensure no transparency gaps
        })

        // Convert Data URL to Blob for more reliable downloading
        const response = await fetch(dataUrl)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
        link.download = `${fileName}-${timestamp}.png`

        document.body.appendChild(link)
        link.click()

        setTimeout(() => {
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        }, 100)
    } catch (error) {
        console.error('Export failed:', error)
    }
}
