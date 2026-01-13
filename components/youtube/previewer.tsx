"use client"

import { useState } from "react"
import { YoutubeInputPanel } from "./input-panel"
import { YoutubePreviewCard } from "./preview-card"
import { Button } from "@/components/ui/button"
import { exportAsImage } from "@/lib/export"

export type YoutubePreviewData = {
    title: string
    channelName: string
    views: string
    uploadedTime: string
    thumbnailUrl: string
    avatarUrl: string
}

const DEFAULT_DATA: YoutubePreviewData = {
    title: "Building the Ultimate Dream Desk Setup (2024)",
    channelName: "Tech Minimalist",
    views: "1.2M views",
    uploadedTime: "2 days ago",
    thumbnailUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1280&q=80",
    avatarUrl: "https://github.com/shadcn.png"
}

export function YoutubePreviewer() {
    const [data, setData] = useState<YoutubePreviewData>(DEFAULT_DATA)
    const [isMobile, setIsMobile] = useState(false)

    const handleExport = () => {
        exportAsImage("youtube-preview-card", "youtube-preview")
    }

    return (
        <div className="flex flex-col gap-6 min-h-[calc(100vh-4rem)] p-6 overflow-y-auto">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-2xl font-bold tracking-tight">YouTube Previewer</h2>
                <Button onClick={handleExport} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-0 shadow-lg shadow-red-500/20">
                    Export Image
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 shrink-0 min-h-[600px]">
                <div className="w-full lg:w-[400px] shrink-0 overflow-y-auto">
                    <YoutubeInputPanel
                        data={data}
                        onChange={setData}
                        isMobile={isMobile}
                        onMobileChange={setIsMobile}
                    />
                </div>
                <div className="flex-1 rounded-xl border border-border/50 bg-zinc-950/50 backdrop-blur-xl flex items-center justify-center relative overflow-hidden p-8 shadow-inner">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div id="youtube-preview-card" className="p-4 bg-transparent inline-block"> {/* Wrapper for export */}
                        <YoutubePreviewCard data={data} isMobile={isMobile} />
                    </div>
                </div>
            </div>

            {/* Educational Content for AdSense SEO */}
            <div className="mt-12 max-w-4xl mx-auto space-y-12 pb-24 border-t border-sidebar-border pt-12">
                <section className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">YouTube Thumbnail Optimization: The Key to Visual Hooking</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        In the ocean of content that is YouTube, your thumbnail is the primary visual hook that determines whether a user clicks on your video or scrolls past it. Professional YouTubers know that a high-CTR (Click-Through Rate) thumbnail is often more important than the video itself. This tool is designed to help you preview how your thumbnail and title will look across different viewports.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Mobile vs. Desktop Visibility</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            YouTube's UI behaves differently across devices. On mobile, thumbnails are often larger but titles are more likely to be truncated. Using a <span className="text-foreground font-medium">YouTube thumbnail previewer</span> allows you to check for readability and framing. If your text is too small or your face is hidden by the timestamp, you're losing potential views. Our <span className="text-foreground font-medium">YouTube UI template</span> ensures your framing is pixel-perfect before you publish.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Consistent Branding and Authority</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your channel avatar and name are crucial for building long-term recognition. A professional <span className="text-foreground font-medium">YouTube preview mock</span> helps you verify that your avatar doesn't clash with your thumbnail colors and that your channel name is clearly visible. Consistency breeds trust, and trust is what turns viewers into loyal subscribers.
                        </p>
                    </div>
                </section>

                <section className="bg-sidebar/30 rounded-2xl p-8 border border-sidebar-border">
                    <h3 className="text-xl font-bold mb-4">Testing Titles and Hooks</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        A great title complements the thumbnail to complete the psychological loop. Use this tool to test different title lengths and see where the "danger zone" for truncation begins. Master your <span className="text-foreground font-medium">YouTube metadata strategy</span> by previewing every upload before it touches the server. Proper planning of your video's "packaging" is the fastest way to improve your performance in the YouTube algorithm.
                    </p>
                </section>
            </div>
        </div>
    )
}
