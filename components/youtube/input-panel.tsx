"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, Upload, RefreshCw } from "lucide-react"
import type { YoutubePreviewData } from "./previewer"

interface YoutubeInputPanelProps {
    data: YoutubePreviewData
    onChange: (data: YoutubePreviewData) => void
    isMobile: boolean
    onMobileChange: (isMobile: boolean) => void
}

export function YoutubeInputPanel({ data, onChange, isMobile, onMobileChange }: YoutubeInputPanelProps) {
    const handleChange = (key: keyof YoutubePreviewData, value: string) => {
        onChange({ ...data, [key]: value })
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, key: keyof YoutubePreviewData) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File is too large (max 5MB)")
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                handleChange(key, reader.result as string)
            }
            reader.onerror = () => {
                console.error("Error reading file")
                alert("Failed to provide image. Please try again.")
            }
            try {
                reader.readAsDataURL(file)
            } catch (error) {
                console.error("File upload error:", error)
                alert("Error uploading file")
            }
        }
    }

    return (
        <div className="space-y-6">
            <Card className="border-sidebar-border bg-sidebar/50 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                    <CardDescription>Customize your video preview.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>View Mode</Label>
                        <Tabs value={isMobile ? "mobile" : "desktop"} onValueChange={(v) => onMobileChange(v === "mobile")} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="desktop" className="flex items-center gap-2">
                                    <Monitor className="h-4 w-4" /> Desktop
                                </TabsTrigger>
                                <TabsTrigger value="mobile" className="flex items-center gap-2">
                                    <Smartphone className="h-4 w-4" /> Mobile
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Video Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            placeholder="e.g. My Awesome Video"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="channel">Channel Name</Label>
                        <Input
                            id="channel"
                            value={data.channelName}
                            onChange={(e) => handleChange("channelName", e.target.value)}
                            placeholder="e.g. MrBeast"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="views">Views</Label>
                            <Input
                                id="views"
                                value={data.views}
                                onChange={(e) => handleChange("views", e.target.value)}
                                placeholder="e.g. 1M views"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Time Uploaded</Label>
                            <Input
                                id="time"
                                value={data.uploadedTime}
                                onChange={(e) => handleChange("uploadedTime", e.target.value)}
                                placeholder="e.g. 2 hours ago"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="thumbnail">Thumbnail</Label>
                        <div className="flex gap-2">
                            <Input
                                id="thumbnail"
                                value={data.thumbnailUrl}
                                onChange={(e) => handleChange("thumbnailUrl", e.target.value)}
                                placeholder="https://..."
                                className="flex-1"
                            />
                            <div className="relative">
                                <Input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer w-10 px-0"
                                    onChange={(e) => handleFileUpload(e, 'thumbnailUrl')}
                                    accept="image/*"
                                />
                                <Button size="icon" variant="outline" type="button" className="pointer-events-none">
                                    <Upload className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button size="icon" variant="ghost" title="Reset to default" onClick={() => handleChange("thumbnailUrl", "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1280&q=80")}>
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="avatar">Avatar</Label>
                        <div className="flex gap-2">
                            <Input
                                id="avatar"
                                value={data.avatarUrl}
                                onChange={(e) => handleChange("avatarUrl", e.target.value)}
                                placeholder="https://..."
                                className="flex-1"
                            />
                            <div className="relative">
                                <Input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer w-10 px-0"
                                    onChange={(e) => handleFileUpload(e, 'avatarUrl')}
                                    accept="image/*"
                                />
                                <Button size="icon" variant="outline" type="button" className="pointer-events-none">
                                    <Upload className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
