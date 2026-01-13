"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Music2, Upload, Trash2, Bookmark, Search, User, Home, Users, Plus as PlusIcon, Tv } from "lucide-react"
import { cn } from "@/lib/utils"
import { exportAsImage } from "@/lib/export"

export default function TiktokSafeZonePreview() {
    const [mediaUrl, setMediaUrl] = useState<string>("")
    const [avatarUrl, setAvatarUrl] = useState<string>("https://github.com/shadcn.png")
    const [username, setUsername] = useState("alex_creator")
    const [description, setDescription] = useState("This is how your TikTok hook looks with the UI overlays! #tiktok #trending #preview")
    const [musicName, setMusicName] = useState("Original Sound - alex_creator")
    const [showSafeZones, setShowSafeZones] = useState(true)
    const [showUI, setShowUI] = useState(true)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setMediaUrl(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setAvatarUrl(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="flex flex-col gap-6 min-h-[calc(100vh-4rem)] p-6 overflow-y-auto">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-2xl font-bold tracking-tight">TikTok Safe Zone Previewer</h2>
                <Button
                    onClick={() => exportAsImage("tiktok-preview-area", "tiktok-safe-zone")}
                    className="bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] hover:opacity-90 text-black font-bold border-0 shadow-lg shadow-pink-500/20"
                >
                    Export Image
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 shrink-0 min-h-[800px]">
                {/* Input Panel */}
                <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6">
                    {/* ... (keep existing card content) ... */}
                    <Card className="flex-1 border-sidebar-border bg-sidebar/50 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle>TikTok Mockup</CardTitle>
                            <CardDescription>
                                Preview how your content will look under the TikTok UI.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="safe-zones" className="cursor-pointer">Show Safe Zones</Label>
                                    <Switch id="safe-zones" checked={showSafeZones} onCheckedChange={setShowSafeZones} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="show-ui" className="cursor-pointer">Show TikTok UI Mockup</Label>
                                    <Switch id="show-ui" checked={showUI} onCheckedChange={setShowUI} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Media Content</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleFileUpload}
                                            accept="image/*"
                                        />
                                        <Button variant="outline" className="w-full gap-2">
                                            <Upload className="h-4 w-4" /> Upload 9:16 Image
                                        </Button>
                                    </div>
                                    {mediaUrl && (
                                        <Button size="icon" variant="ghost" onClick={() => setMediaUrl("")}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-border/50">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Profile Avatar</Label>
                                    <div className="flex gap-2">
                                        <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="URL" />
                                        <div className="relative">
                                            <Input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer w-10 px-0"
                                                onChange={handleAvatarUpload}
                                                accept="image/*"
                                            />
                                            <Button size="icon" variant="outline"><Upload className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Caption</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="h-24 resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="music">Music Name</Label>
                                    <Input id="music" value={musicName} onChange={(e) => setMusicName(e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Panel */}
                <div className="flex-1 rounded-xl border border-border/50 bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#202020_0%,#000000_100%)]"></div>

                    <div id="tiktok-preview-area" className="relative h-full aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-zinc-800">
                        {/* Media Source */}
                        {mediaUrl ? (
                            <img src={mediaUrl} className="absolute inset-0 w-full h-full object-cover" alt="TikTok Content" />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 gap-4">
                                <Upload className="h-12 w-12" />
                                <p className="text-sm">Upload 9:16 Video Frame</p>
                            </div>
                        )}

                        {/* TikTok UI Overlay Mockup */}
                        {showUI && (
                            <div className="absolute inset-0 pointer-events-none flex flex-col items-stretch text-white font-sans overflow-hidden">
                                {/* Top Nav - Fixed at top */}
                                <div className="pt-8 px-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/40 to-transparent">
                                    <Tv className="h-6 w-6 opacity-90" />
                                    <div className="flex items-center gap-5 text-[15px] font-bold">
                                        <span className="opacity-60">Following</span>
                                        <div className="relative">
                                            <span>For You</span>
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <Search className="h-6 w-6 opacity-90" />
                                </div>

                                {/* Main Area - Pushed to fill space */}
                                <div className="flex-1 relative">
                                    {/* Side Actions - Positioned relative to main area */}
                                    <div className="absolute right-2 bottom-12 flex flex-col items-center gap-4">
                                        {/* Profile with Plus Button */}
                                        <div className="relative mb-2">
                                            <div className="w-10 h-10 rounded-full border border-white overflow-hidden bg-zinc-800">
                                                <img src={avatarUrl} className="w-full h-full object-cover" alt="Profile" />
                                            </div>
                                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#FE2C55] rounded-full w-4 h-4 flex items-center justify-center text-white border border-white">
                                                <span className="text-[12px] font-bold leading-none">+</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <Heart className="h-[26px] w-[26px] fill-white drop-shadow-lg" />
                                            <span className="text-[11px] font-semibold mt-1 drop-shadow-md">1.2M</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <MessageCircle className="h-[26px] w-[26px] fill-white drop-shadow-lg" />
                                            <span className="text-[11px] font-semibold mt-1 drop-shadow-md">4.5K</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="h-[26px] w-[26px] bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                                                <Bookmark className="h-3.5 w-3.5 fill-white text-white" />
                                            </div>
                                            <span className="text-[11px] font-semibold mt-1 drop-shadow-md">82K</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <Share2 className="h-[26px] w-[26px] fill-white drop-shadow-lg" />
                                            <span className="text-[11px] font-semibold mt-1 drop-shadow-md">12K</span>
                                        </div>

                                        {/* Rotating Record */}
                                        <div className="mt-2 w-9 h-9 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center animate-spin-slow overflow-hidden">
                                            <div className="w-5 h-5 rounded-full overflow-hidden">
                                                <img src={avatarUrl} className="w-full h-full object-cover opacity-80" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Info - Positioned at bottom of main area */}
                                    <div className="absolute left-0 bottom-4 right-0 px-4 space-y-2 pr-16">
                                        <div className="font-bold text-[15px] drop-shadow-md">@{username}</div>
                                        <div className="text-[14px] line-clamp-2 leading-snug drop-shadow-md max-w-[90%]">
                                            {description}
                                        </div>
                                        <div className="flex items-center gap-2 text-[13px] drop-shadow-md">
                                            <Music2 className="h-3.5 w-3.5" />
                                            <div className="max-w-[150px] overflow-hidden whitespace-nowrap">
                                                <span className="inline-block animate-marquee">{musicName}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Nav - Fixed at bottom */}
                                <div className="h-[70px] bg-black border-t border-white/10 flex items-center justify-around px-2 pb-2">
                                    <div className="flex flex-col items-center gap-1 opacity-100">
                                        <Home className="h-6 w-6" />
                                        <span className="text-[10px]">Home</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 opacity-60">
                                        <Users className="h-6 w-6" />
                                        <span className="text-[10px]">Friends</span>
                                    </div>
                                    <div className="relative">
                                        <div className="h-7 w-11 bg-white rounded-lg flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#25F4EE]"></div>
                                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#FE2C55]"></div>
                                            <PlusIcon className="h-6 w-6 text-black relative z-10" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 opacity-60">
                                        <div className="relative">
                                            <MessageCircle className="h-6 w-6" />
                                            <div className="absolute -top-1 -right-1.5 bg-[#FE2C55] rounded-full px-1 py-0 text-[8px] font-bold">2</div>
                                        </div>
                                        <span className="text-[10px]">Inbox</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 opacity-60">
                                        <User className="h-6 w-6" />
                                        <span className="text-[10px]">Profile</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Safe Zone Overlay */}
                        {showSafeZones && (
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Top Overlay */}
                                <div className="absolute top-0 left-0 right-0 h-[10%] bg-red-500/20 border-b border-red-500/50 flex items-center justify-center">
                                    <span className="text-[10px] text-red-500 font-bold bg-black/50 px-2 py-0.5 rounded">UI DANGER ZONE (SEARCH)</span>
                                </div>
                                {/* Right Side Overlay */}
                                <div className="absolute top-[10%] right-0 bottom-[20%] w-[18%] bg-red-500/20 border-l border-red-500/50 flex items-center justify-center">
                                    <span className="text-[10px] text-red-500 font-bold bg-black/50 px-2 py-0.5 rounded rotate-90 whitespace-nowrap">UI ACTIONS</span>
                                </div>
                                {/* Bottom Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-red-500/20 border-t border-red-500/50 flex flex-col items-center justify-center">
                                    <span className="text-[10px] text-red-500 font-bold bg-black/50 px-2 py-0.5 rounded">UI INFO & CAPTIONS</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Educational Content for AdSense SEO */}
            <div className="mt-12 max-w-4xl mx-auto space-y-12 pb-24 border-t border-sidebar-border pt-12">
                <section className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Why TikTok Safe Zones Matter for Creators</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The visual landscape of TikTok is dynamic but crowded. With overlays like the profile icon, heart button, comments, and share options on the right, and the caption and audio info on the bottom, the "safe" area for your primary content is actually quite small. If you place important text or action items in these "danger zones," you risk them being obscured or completely unreadable.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Avoiding the "Phantom Click"</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            When users try to interact with your video—like double-tapping to like or clicking a link in your bio—they might accidentally hit a UI element if your content isn't optimized. A <span className="text-foreground font-medium">TikTok UI template</span> or <span className="text-foreground font-medium">Safe zone dimensions</span> guide is essential for any professional creator or marketer. By using a "TikTok Safe Zone Previewer," you can ensure your hook is visible and your call-to-action isn't buried under the "Follow" button.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Optimizing for Different Devices</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            While TikTok tries to standardize the UI, the dimensions can shift slightly between iPhone and Android, or between different aspect ratios. The "red danger zones" in our tool represent the most common areas of overlap. Always leave a buffer around your text to ensure it's readable across all mobile screen sizes. Key terms to keep in mind: <span className="text-foreground font-medium">TikTok margin</span>, <span className="text-foreground font-medium">video safe area</span>, and <span className="text-foreground font-medium">TikTok overlay guide</span>.
                        </p>
                    </div>
                </section>

                <section className="bg-sidebar/30 rounded-2xl p-8 border border-sidebar-border">
                    <h3 className="text-xl font-bold mb-4">Boosting Engagement through Proper Layout</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        A clean, well-framed video looks more professional. When your captions are perfectly placed above the UI, users are more likely to read them and stay engaged with your content. Don't let a poorly placed "See more" tag kill your retention rate. Using this preview tool helps you master your TikTok layout every time, leading to higher engagement scores and better performance in the TikTok algorithm. Whether you're a brand or a solo creator, ignoring safe zones is the fastest way to lower the perceived quality of your content.
                    </p>
                </section>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 10s linear infinite;
                }
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}
