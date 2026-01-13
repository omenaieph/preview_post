"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Heart,
    MessageCircle,
    Repeat2,
    Share,
    Upload,
    Trash2,
    Plus,
    X as XIcon,
    BarChart3
} from "lucide-react"
import { cn } from "@/lib/utils"
import { exportAsImage } from "@/lib/export"

interface TweetContent {
    id: string
    text: string
    mediaUrl: string
}

export default function XPreview() {
    const [tweets, setTweets] = useState<TweetContent[]>([
        { id: "1", text: "Writing the perfect tweet is an art form. ✍️\n\nIt needs to be punchy, engaging, and provide value in under 280 characters.\n\nThreads are even better for deep dives. Let's see how this one looks!", mediaUrl: "" }
    ])
    const [name, setName] = useState("Alex Creator")
    const [handle, setHandle] = useState("alex_creator")
    const [avatar, setAvatar] = useState("https://github.com/shadcn.png")
    const [theme, setTheme] = useState<"light" | "dim" | "dark">("dark")
    const [metrics, setMetrics] = useState({
        replies: "42",
        reposts: "128",
        likes: "1,024",
        views: "12.5K"
    })

    const MAX_CHARS = 280

    const addTweet = () => {
        setTweets([...tweets, { id: Math.random().toString(), text: "", mediaUrl: "" }])
    }

    const removeTweet = (id: string) => {
        if (tweets.length > 1) {
            setTweets(tweets.filter(t => t.id !== id))
        }
    }

    const updateTweet = (id: string, updates: Partial<TweetContent>) => {
        setTweets(tweets.map(t => t.id === id ? { ...t, ...updates } : t))
    }

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File is too large (max 5MB)")
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => setAvatar(reader.result as string)
            reader.onerror = () => alert("Failed to load avatar")
            try {
                reader.readAsDataURL(file)
            } catch (error) {
                console.error("Avatar upload error:", error)
                alert("Error uploading avatar")
            }
        }
    }

    const handleMediaUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File is too large (max 5MB)")
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => updateTweet(id, { mediaUrl: reader.result as string })
            reader.onerror = () => alert("Failed to load media")
            try {
                reader.readAsDataURL(file)
            } catch (error) {
                console.error("Media upload error:", error)
                alert("Error uploading media")
            }
        }
    }

    const getThemeStyles = () => {
        switch (theme) {
            case "light": return "bg-white text-black border-zinc-200"
            case "dim": return "bg-[#15202b] text-white border-zinc-800"
            case "dark": return "bg-black text-white border-zinc-800"
        }
    }

    const getSecondaryText = () => {
        return theme === "light" ? "text-zinc-500" : "text-zinc-400"
    }

    return (
        <div className="flex flex-col gap-6 h-[calc(100vh-4rem)] p-6">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-2xl font-bold tracking-tight">𝕏 Previewer</h2>
                <div className="flex gap-3">
                    <Tabs value={theme} onValueChange={(v: any) => setTheme(v)}>
                        <TabsList className="bg-sidebar-accent">
                            <TabsTrigger value="light">Light</TabsTrigger>
                            <TabsTrigger value="dim">Dim</TabsTrigger>
                            <TabsTrigger value="dark">Lights Out</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Button
                        onClick={() => exportAsImage("x-preview-area", "x-tweet-preview")}
                        className="bg-zinc-100 hover:bg-zinc-200 text-black font-bold border-0 shadow-lg"
                    >
                        Export PNG
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
                {/* Input Panel */}
                <div className="w-full lg:w-[450px] shrink-0 flex flex-col gap-6 overflow-y-auto pr-2">
                    <Card className="border-sidebar-border bg-sidebar/50 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle>Profile Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="space-y-2 flex-1">
                                    <Label>Name</Label>
                                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <Label>Handle</Label>
                                    <Input value={handle} onChange={(e) => setHandle(e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Avatar</Label>
                                <div className="flex gap-2">
                                    <Input value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="URL or upload" />
                                    <div className="relative">
                                        <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer w-10 px-0" onChange={handleAvatarUpload} accept="image/*" />
                                        <Button size="icon" variant="outline"><Upload className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {tweets.map((tweet, index) => (
                        <Card key={tweet.id} className="border-sidebar-border bg-sidebar/50 backdrop-blur-lg">
                            <CardHeader className="flex flex-row items-center justify-between py-4">
                                <CardTitle className="text-sm">Tweet {index + 1}</CardTitle>
                                {tweets.length > 1 && (
                                    <Button size="icon" variant="ghost" onClick={() => removeTweet(tweet.id)}>
                                        <XIcon className="h-4 w-4 text-red-500" />
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-end mb-1">
                                        <Label>Content</Label>
                                        <span className={cn("text-[10px]", tweet.text.length > MAX_CHARS ? "text-red-500 font-bold" : "text-muted-foreground")}>
                                            {tweet.text.length}/{MAX_CHARS}
                                        </span>
                                    </div>
                                    <Textarea
                                        value={tweet.text}
                                        onChange={(e) => updateTweet(tweet.id, { text: e.target.value })}
                                        placeholder="What's happening?"
                                        className="h-24 resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Media (Optional)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={tweet.mediaUrl}
                                            onChange={(e) => updateTweet(tweet.id, { mediaUrl: e.target.value })}
                                            placeholder="Image URL or upload"
                                        />
                                        <div className="relative">
                                            <Input type="file" className="absolute inset-0 opacity-0 cursor-pointer w-10 px-0" onChange={(e) => handleMediaUpload(tweet.id, e)} accept="image/*" />
                                            <Button size="icon" variant="outline"><Upload className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <Button onClick={addTweet} variant="outline" className="w-full border-dashed gap-2">
                        <Plus className="h-4 w-4" /> Add Tweet to Thread
                    </Button>

                    <Card className="border-sidebar-border bg-sidebar/50 backdrop-blur-lg mb-6">
                        <CardHeader>
                            <CardTitle className="text-sm">Engagement Metrics</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs">Replies</Label>
                                <Input value={metrics.replies} onChange={(e) => setMetrics({ ...metrics, replies: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Reposts</Label>
                                <Input value={metrics.reposts} onChange={(e) => setMetrics({ ...metrics, reposts: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Likes</Label>
                                <Input value={metrics.likes} onChange={(e) => setMetrics({ ...metrics, likes: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Views</Label>
                                <Input value={metrics.views} onChange={(e) => setMetrics({ ...metrics, views: e.target.value })} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Panel */}
                <div className="flex-1 rounded-xl border border-border/50 bg-zinc-100 dark:bg-zinc-950/50 backdrop-blur-xl flex items-start justify-center p-8 relative overflow-y-auto shadow-inner">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                    <div id="x-preview-area" className={cn("w-full max-w-[600px] border rounded-xl overflow-hidden shadow-2xl transition-colors duration-300", getThemeStyles())}>
                        {tweets.map((tweet, index) => (
                            <div key={tweet.id} className={cn("p-4 flex gap-3 relative", index !== tweets.length - 1 && "pb-6")}>
                                {/* Thread Connector line */}
                                {index !== tweets.length - 1 && (
                                    <div className="absolute left-[34px] top-[60px] bottom-0 w-[2px] bg-zinc-800/50" />
                                )}

                                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-zinc-500/10">
                                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" crossOrigin={avatar.startsWith("http") ? "anonymous" : undefined} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1 mb-0.5">
                                        <span className="font-bold truncate">{name}</span>
                                        <span className={cn("text-sm truncate", getSecondaryText())}>@{handle} · 2h</span>
                                    </div>
                                    <div className="whitespace-pre-wrap text-[15px] leading-normal mb-3">
                                        {tweet.text}
                                    </div>

                                    {tweet.mediaUrl && (
                                        <div className="rounded-2xl border border-zinc-800 overflow-hidden mb-3">
                                            <img src={tweet.mediaUrl} alt="Media" className="w-full h-auto max-h-[500px] object-cover" crossOrigin={tweet.mediaUrl.startsWith("http") ? "anonymous" : undefined} />
                                        </div>
                                    )}

                                    {/* Action bar and metrics only for the main tweet (index 0) or all? 
                                        In current X layout, each tweet in thread has its icon bar. 
                                        The views and date usually only show on single tweet view, but let's keep it clean.
                                    */}
                                    <div className={cn("flex items-center justify-between max-w-[425px]", getSecondaryText())}>
                                        <div className="flex items-center gap-1 group cursor-pointer hover:text-blue-500">
                                            <div className="p-2 rounded-full group-hover:bg-blue-500/10"><MessageCircle className="h-4 w-4" /></div>
                                            <span className="text-xs">{metrics.replies}</span>
                                        </div>
                                        <div className="flex items-center gap-1 group cursor-pointer hover:text-green-500">
                                            <div className="p-2 rounded-full group-hover:bg-green-500/10"><Repeat2 className="h-4 w-4" /></div>
                                            <span className="text-xs">{metrics.reposts}</span>
                                        </div>
                                        <div className="flex items-center gap-1 group cursor-pointer hover:text-pink-500">
                                            <div className="p-2 rounded-full group-hover:bg-pink-500/10"><Heart className="h-4 w-4" /></div>
                                            <span className="text-xs">{metrics.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1 group cursor-pointer hover:text-blue-500">
                                            <div className="p-2 rounded-full group-hover:bg-blue-500/10"><BarChart3 className="h-4 w-4" /></div>
                                            <span className="text-xs">{metrics.views}</span>
                                        </div>
                                        <div className="flex items-center gap-1 group cursor-pointer hover:text-blue-500">
                                            <div className="p-2 rounded-full group-hover:bg-blue-500/10"><Share className="h-4 w-4" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
