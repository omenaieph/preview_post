"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    MoreHorizontal,
    Upload,
    Trash2,
    Plus,
    ChevronLeft,
    ChevronRight,
    Grid,
    Square
} from "lucide-react"
import { cn } from "@/lib/utils"
import { exportAsImage } from "@/lib/export"

interface InstagramImage {
    id: string
    url: string
}

export default function InstagramPreview() {
    const [images, setImages] = useState<InstagramImage[]>([
        { id: "1", url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" }
    ])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [aspectRatio, setAspectRatio] = useState<"1:1" | "4:5">("1:1")
    const [viewMode, setViewMode] = useState<"feed" | "grid">("feed")
    const [username, setUsername] = useState("alex_creator")
    const [avatar, setAvatar] = useState("https://github.com/shadcn.png")
    const [caption, setCaption] = useState("Exploring new horizons. 📸 #photography #adventure")
    const [likes, setLikes] = useState("4,281")

    const [isLoading, setIsLoading] = useState(false)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsLoading(true)
        const newImages: InstagramImage[] = []
        let processed = 0

        Array.from(files).forEach(file => {
            if (file.size > 10 * 1024 * 1024) { // Upped to 10MB for better UX, but alerted
                alert(`File ${file.name} is very large. Processing might take a moment.`)
            }

            const reader = new FileReader()
            reader.onload = () => {
                newImages.push({
                    id: Math.random().toString(),
                    url: reader.result as string
                })
                processed++
                if (processed === files.length) {
                    setImages(prev => [...prev, ...newImages])
                    setIsLoading(false)
                }
            }
            reader.onerror = () => {
                console.error("FileReader error")
                processed++
                if (processed === files.length) setIsLoading(false)
            }
            reader.readAsDataURL(file)
        })
    }

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => setAvatar(reader.result as string)
        reader.readAsDataURL(file)
    }

    const removeImage = (id: string) => {
        if (images.length > 1) {
            const index = images.findIndex(img => img.id === id)
            if (index <= currentImageIndex && currentImageIndex > 0) {
                setCurrentImageIndex(currentImageIndex - 1)
            }
            setImages(images.filter(img => img.id !== id))
        }
    }

    return (
        <div className="flex flex-col gap-6 min-h-[calc(100vh-4rem)] p-6 overflow-y-auto">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-2xl font-bold tracking-tight">Instagram Previewer</h2>
                <div className="flex gap-3">
                    <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
                        <TabsList className="bg-sidebar-accent">
                            <TabsTrigger value="feed" className="gap-2"><Square className="h-4 w-4" /> Feed</TabsTrigger>
                            <TabsTrigger value="grid" className="gap-2"><Grid className="h-4 w-4" /> Grid</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="flex flex-col items-end gap-1">
                        <Button
                            onClick={() => exportAsImage("insta-preview-area", "instagram-preview")}
                            className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white font-bold border-0 shadow-lg"
                        >
                            Export Image
                        </Button>
                        <span className="text-[10px] text-muted-foreground block lg:hidden">
                            *iPhone users: Click twice if image is blank
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 shrink-0 min-h-[700px]">
                {/* Input Panel */}
                <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6 overflow-y-auto pr-2">
                    <Card className="border-sidebar-border bg-sidebar/50 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle>Profile & Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Username</Label>
                                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Avatar URL</Label>
                                <div className="flex gap-2">
                                    <Input value={avatar} onChange={(e) => setAvatar(e.target.value)} className="flex-1" />
                                    <div className="relative">
                                        <Input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer w-10 px-0"
                                            onChange={handleAvatarUpload}
                                            accept="image/*"
                                        />
                                        <Button size="icon" variant="outline" type="button" className="pointer-events-none">
                                            <Upload className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Likes Count</Label>
                                <Input value={likes} onChange={(e) => setLikes(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Caption</Label>
                                <Input value={caption} onChange={(e) => setCaption(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-sidebar-border bg-sidebar/50 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle className="text-sm">Post Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Aspect Ratio</Label>
                                <Tabs value={aspectRatio} onValueChange={(v: any) => setAspectRatio(v)}>
                                    <TabsList className="w-full">
                                        <TabsTrigger value="1:1" className="flex-1">1:1 (Square)</TabsTrigger>
                                        <TabsTrigger value="4:5" className="flex-1">4:5 (Portrait)</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                            <div className="space-y-2">
                                <Label>Carousel Images ({images.length})</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {images.map((img) => (
                                        <div key={img.id} className="relative aspect-square rounded-md overflow-hidden group border border-border">
                                            <img src={img.url} className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => removeImage(img.id)}
                                                className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 className="h-3 w-3 text-white" />
                                            </button>
                                        </div>
                                    ))}
                                    <label className="aspect-square rounded-md border border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                                        <Plus className="h-4 w-4 text-muted-foreground" />
                                        <input type="file" className="hidden" onChange={handleFileUpload} multiple accept="image/*" />
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Panel */}
                <div className="flex-1 rounded-xl border border-border/50 bg-white dark:bg-zinc-950 flex items-start justify-center p-8 relative overflow-y-auto shadow-inner">
                    <div id="insta-preview-area" className="w-full max-w-[470px] bg-white dark:bg-black rounded-sm border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden text-black dark:text-white font-sans">
                        {viewMode === "feed" ? (
                            <>
                                {/* Header */}
                                <div className="p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                            <img src={avatar} className="w-full h-full object-cover" crossOrigin={avatar.startsWith("http") ? "anonymous" : undefined} />
                                        </div>
                                        <span className="font-semibold text-sm">{username}</span>
                                    </div>
                                    <MoreHorizontal className="h-5 w-5" />
                                </div>

                                {/* Main Image (Carousel) */}
                                <div className={cn("relative bg-zinc-100 dark:bg-zinc-900", aspectRatio === "1:1" ? "aspect-square" : "aspect-[4/5]")}>
                                    <img src={images[currentImageIndex]?.url} className="w-full h-full object-cover" crossOrigin={images[currentImageIndex]?.url.startsWith("http") ? "anonymous" : undefined} />

                                    {images.length > 1 && (
                                        <>
                                            {currentImageIndex > 0 && (
                                                <button
                                                    onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
                                                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all"
                                                >
                                                    <ChevronLeft className="h-5 w-5" />
                                                </button>
                                            )}
                                            {currentImageIndex < images.length - 1 && (
                                                <button
                                                    onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all"
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </button>
                                            )}
                                            {/* Indicators */}
                                            <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white">
                                                {currentImageIndex + 1}/{images.length}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="p-3">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-4">
                                            <Heart className="h-6 w-6 hover:text-zinc-500 cursor-pointer" />
                                            <MessageCircle className="h-6 w-6 hover:text-zinc-500 cursor-pointer" />
                                            <Send className="h-6 w-6 hover:text-zinc-500 cursor-pointer" />
                                        </div>
                                        <Bookmark className="h-6 w-6 hover:text-zinc-500 cursor-pointer" />
                                    </div>

                                    <div className="space-y-1 text-sm">
                                        <div className="font-semibold">{likes} likes</div>
                                        <div>
                                            <span className="font-semibold mr-2">{username}</span>
                                            <span className="whitespace-pre-wrap">{caption}</span>
                                        </div>
                                        <div className="text-zinc-500 dark:text-zinc-400 text-[10px] pt-1 uppercase tracking-tight">
                                            2 hours ago · <span className="text-black dark:text-white font-medium">See translation</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="aspect-square bg-white dark:bg-black p-0.5">
                                <div className="grid grid-cols-3 gap-0.5 h-full">
                                    {/* Fill with current images, then placeholders */}
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <div key={i} className="aspect-square bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative group">
                                            {images[i] ? (
                                                <img src={images[i].url} className="w-full h-full object-cover" crossOrigin={images[i].url.startsWith("http") ? "anonymous" : undefined} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-20">
                                                    <Square className="h-8 w-8 text-zinc-400" />
                                                </div>
                                            )}
                                            {i === 0 && (
                                                <div className="absolute top-2 right-2">
                                                    <div className="w-4 h-4 rounded-sm border-[1.5px] border-white/80" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Educational Content for AdSense SEO */}
            <div className="mt-12 max-w-4xl mx-auto space-y-12 pb-24 border-t border-sidebar-border pt-12">
                <section className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Instagram Aesthetics: Creating a Cohesive Visual Identity</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Instagram is a visual-first platform where aesthetics can make or break a brand. Whether you're posting to your feed or planning a grid layout, consistency is key. This tool is designed to help you preview your content in both **Feed View** and **Profile Grid** modes, ensuring every post contributes to a professional and engaging presence.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Mastering Aspect Ratios</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Choosing between a 1:1 square and a 4:5 portrait ratio significantly impacts how your content occupies the screen. A <span className="text-foreground font-medium">Instagram feed previewer</span> allows you to test both formats. Portrait (4:5) posts often perform better as they take up more vertical space in the user's feed, increasing engagement potential. Use our <span className="text-foreground font-medium">Instagram UI template</span> to find the perfect framing for your photos.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">The 9-Grid Strategy</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A user's first impression of your profile is determined by your top 9 posts. A professional <span className="text-foreground font-medium">Instagram grid planner</span> helps you visualize how individual images work together as a cohesive story. If your grid looks cluttered or disjointed, potential followers may bounce. Mastering your <span className="text-foreground font-medium">Instagram visual strategy</span> is about balance, color harmony, and strategic sequencing.
                        </p>
                    </div>
                </section>

                <section className="bg-sidebar/30 rounded-2xl p-8 border border-sidebar-border">
                    <h3 className="text-xl font-bold mb-4">Captions and Engagement</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        While images grab attention, captions build connection. Use this tool to see how your captions and likes look within the Instagram interface. Previewing the "read more" cutoff point is crucial for ensuring your primary call-to-action is visible. By pre-visualizing your <span className="text-foreground font-medium">Instagram content strategy</span>, you can ensure every post is optimized for maximum impact and reach.
                    </p>
                </section>
            </div>
        </div>
    )
}
