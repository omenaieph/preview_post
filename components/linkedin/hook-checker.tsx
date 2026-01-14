"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ThumbsUp, MessageSquare, Repeat, Send, Upload, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { exportAsImage } from "@/lib/export"

const TRUNCATION_LIMIT = 210

export default function LinkedinHookChecker() {
    const [content, setContent] = useState(
        "Stop scrolling. 🛑\n\nMost people get LinkedIn wrong. They treat it like a resume repository instead of a content platform.\n\nHere's the truth: Your profile is your landing page. Your posts are your ads.\n\nIf you're not optimizing the first 3 lines of your post, you're losing 80% of your audience immediately. The 'see more' button is the enemy of engagement if you don't earn the click.\n\nHere is how to fix it..."
    )
    const [mediaUrl, setMediaUrl] = useState<string>("")
    const [authorName, setAuthorName] = useState("Alex Creator")
    const [authorHeadline, setAuthorHeadline] = useState("Founder @ PreviewPost")
    const [authorAvatar, setAuthorAvatar] = useState("https://github.com/shadcn.png")
    const [likes, setLikes] = useState("1,234")
    const [comments, setComments] = useState("56")

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => setMediaUrl(reader.result as string)
        reader.readAsDataURL(file)
    }

    const isTruncated = content.length > TRUNCATION_LIMIT
    const visibleText = content.slice(0, TRUNCATION_LIMIT)
    const hiddenText = content.slice(TRUNCATION_LIMIT)

    return (
        <div className="flex flex-col gap-6 min-h-[calc(100vh-4rem)] p-6 overflow-y-auto">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-2xl font-bold tracking-tight">LinkedIn Hook Checker</h2>
                <div className="flex flex-col items-end gap-1">
                    <Button
                        onClick={() => exportAsImage("linkedin-preview-card", "linkedin-preview")}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-500/20"
                    >
                        Export Preview
                    </Button>
                    <span className="text-[10px] text-muted-foreground block lg:hidden">
                        *iPhone users: Click twice if image is blank
                    </span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 shrink-0 min-h-[850px]">
                {/* Input Panel */}
                <div className="w-full lg:w-[450px] shrink-0 flex flex-col gap-6">
                    {/* ... existing card content ... */}
                    <Card className="flex-1 border-sidebar-border bg-sidebar/50 backdrop-blur-lg flex flex-col">
                        <CardHeader>
                            <CardTitle>Hook Checker</CardTitle>
                            <CardDescription>
                                Write your post. We'll show you exactly where LinkedIn cuts it off.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col gap-6">
                            {/* Profile Section */}
                            <div className="space-y-4 pt-2">
                                <h3 className="text-sm font-medium text-muted-foreground">Profile & Stats</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="authorName">Name</Label>
                                        <Input
                                            id="authorName"
                                            value={authorName}
                                            onChange={(e) => setAuthorName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="authorHeadline">Headline</Label>
                                        <Input
                                            id="authorHeadline"
                                            value={authorHeadline}
                                            onChange={(e) => setAuthorHeadline(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="authorAvatar">Profile Avatar</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="authorAvatar"
                                            value={authorAvatar}
                                            onChange={(e) => setAuthorAvatar(e.target.value)}
                                            placeholder="https://... or upload"
                                            className="flex-1"
                                        />
                                        <div className="relative">
                                            <Input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer w-10 px-0"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        if (file.size > 5 * 1024 * 1024) {
                                                            alert("File is too large (max 5MB)")
                                                            return
                                                        }
                                                        const reader = new FileReader()
                                                        reader.onloadend = () => setAuthorAvatar(reader.result as string)
                                                        reader.readAsDataURL(file)
                                                    }
                                                }}
                                                accept="image/*"
                                            />
                                            <Button size="icon" variant="outline" type="button" className="pointer-events-none">
                                                <Upload className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="likes">Likes</Label>
                                        <Input
                                            id="likes"
                                            value={likes}
                                            onChange={(e) => setLikes(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="comments">Comments</Label>
                                        <Input
                                            id="comments"
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="media">Post Media</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="media"
                                        value={mediaUrl}
                                        onChange={(e) => setMediaUrl(e.target.value)}
                                        placeholder="https://... or upload"
                                        className="flex-1"
                                    />
                                    <div className="relative">
                                        <Input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer w-10 px-0"
                                            onChange={handleFileUpload}
                                            accept="image/*"
                                        />
                                        <Button size="icon" variant="outline" type="button" className="pointer-events-none">
                                            <Upload className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {mediaUrl && (
                                        <Button size="icon" variant="ghost" onClick={() => setMediaUrl("")}>
                                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <Label htmlFor="content">Post Content</Label>
                                <Textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your LinkedIn post here..."
                                    className="flex-1 min-h-[300px] resize-none text-base bg-background/50"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className={cn(isTruncated ? "text-red-500 font-medium" : "text-green-500")}>
                                    {content.length} / {TRUNCATION_LIMIT} chars (approx visible)
                                </span>
                                {isTruncated && <AlertCircle className="h-4 w-4 text-red-500" />}
                            </div>
                        </CardContent>
                    </Card >
                </div >

                {/* Preview Panel */}
                < div className="flex-1 rounded-xl border border-border/50 bg-zinc-100 dark:bg-zinc-950/50 backdrop-blur-xl flex items-start justify-center p-8 relative overflow-y-auto shadow-inner" >
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                    {/* LinkedIn Card */}
                    <div id="linkedin-preview-card" className="p-4 bg-transparent inline-block w-full flex justify-center my-auto">
                        <div className="w-full max-w-[550px] bg-white dark:bg-[#1b1f23] rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden text-[#191919] dark:text-white font-sans">
                            {/* Header */}
                            <div className="p-4 flex gap-3">
                                <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700 shrink-0 overflow-hidden relative group">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={authorAvatar} alt="User" className="w-full h-full object-cover" crossOrigin={authorAvatar.startsWith("http") ? "anonymous" : undefined} />
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) setAuthorAvatar(URL.createObjectURL(file))
                                        }}
                                        accept="image/*"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="font-semibold text-sm leading-tight hover:text-blue-600 cursor-pointer hover:underline">
                                        {authorName}
                                    </div>
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {authorHeadline} • 2h • <span className="text-zinc-400 font-mono">🌐</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-4 pb-2 text-sm leading-[1.6]">
                                <span className="whitespace-pre-wrap">{visibleText}</span>
                                {isTruncated && (
                                    <>
                                        <span className="text-zinc-400">...see more</span>
                                        <span className="opacity-40 line-through decoration-zinc-500/50 text-zinc-500 whitespace-pre-wrap block mt-2 p-2 border-l-2 border-red-500/50 bg-red-500/5 dark:bg-red-900/10">
                                            {hiddenText}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Media Placeholder (Optional) */}
                            {mediaUrl ? (
                                <div className="w-full bg-zinc-100 dark:bg-zinc-900 border-y border-zinc-100 dark:border-zinc-800">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={mediaUrl} alt="Post media" className="w-full h-auto max-h-[500px] object-cover" crossOrigin={mediaUrl.startsWith("http") ? "anonymous" : undefined} />
                                </div>
                            ) : (
                                <div className="aspect-[4/5] md:aspect-video w-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 text-sm border-y border-zinc-100 dark:border-zinc-800 border-dashed">
                                    No Media Selected
                                </div>
                            )}

                            {/* Social Proof */}
                            <div className="px-4 py-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/50">
                                <div className="flex items-center gap-1 hover:text-blue-600 hover:underline cursor-pointer">
                                    <div className="flex -space-x-1">
                                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-white dark:ring-zinc-900">
                                            <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
                                        </div>
                                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center ring-2 ring-white dark:ring-zinc-900">
                                            <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 text-white fill-white"><path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" /></svg>
                                        </div>
                                    </div>
                                    <span className="ml-1">{likes}</span>
                                </div>
                                <div className="hover:text-blue-600 hover:underline cursor-pointer">
                                    {comments} comments
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 mt-2">
                                <button className="flex items-center gap-1.5 px-3 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 dark:text-zinc-400 text-sm font-semibold transition-colors">
                                    <ThumbsUp className="w-5 h-5 -scale-x-100" /> Like
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 dark:text-zinc-400 text-sm font-semibold transition-colors">
                                    <MessageSquare className="w-5 h-5" /> Comment
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 dark:text-zinc-400 text-sm font-semibold transition-colors">
                                    <Repeat className="w-5 h-5" /> Repost
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-500 dark:text-zinc-400 text-sm font-semibold transition-colors">
                                    <Send className="w-5 h-5 -rotate-45 translate-y-[-2px]" /> Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Educational Content for AdSense SEO */}
            <div className="mt-12 max-w-4xl mx-auto space-y-12 pb-24 border-t border-sidebar-border pt-12">
                <section className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Mastering the LinkedIn Hook: How to Stop the Scroll</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        LinkedIn is a high-intent platform, but content saturation is at an all-time high. To stand out, professional creators must master the art of the "hook"—the first three lines of a post that appear before the "see more" button. If your hook doesn't generate immediate curiosity or provide clear value, the rest of your carefully crafted content will go unread on the <span className="text-foreground font-medium">LinkedIn feed preview</span>.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">The Science of the "See More" Button</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            LinkedIn typically truncates posts after roughly 140 to 210 characters, depending on the device and presence of media. This space is your only chance to earn a click. Using a <span className="text-foreground font-medium">LinkedIn hook checker</span> allows you to visualize where that cutoff happens in real-time. By optimizing your <span className="text-foreground font-medium">LinkedIn post layout</span>, you significantly increase the chances of your audience engaging with your full story.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Building Authority and Social Proof</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Beyond the hook, your profile elements—avatar, headline, and name—act as your digital business card. A professional <span className="text-foreground font-medium">LinkedIn preview tool</span> helps you ensure these elements look cohesive and trustworthy. When your post looks polished and high-quality, it naturally attracts more likes and comments, boosting your reach via the LinkedIn algorithm's affinity scores.
                        </p>
                    </div>
                </section>

                <section className="bg-sidebar/30 rounded-2xl p-8 border border-sidebar-border">
                    <h3 className="text-xl font-bold mb-4">Best Practices for High-Reach Posts</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Avoid large blocks of text; use line breaks to improve readability and "scannability." Ensure your headline directly addresses the pain points or aspirations of your target audience. Use this previewer to experiment with different hook lengths and media combinations. Mastering your <span className="text-foreground font-medium">LinkedIn content strategy</span> by previewing every post before it goes live ensures you never waste a valuable opportunity to connect with your professional network.
                    </p>
                </section>
            </div>
        </div>
    )
}
