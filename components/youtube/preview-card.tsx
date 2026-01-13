"use client"

import { motion } from "framer-motion"
import { MoreVertical, CheckCircle2 } from "lucide-react"
import type { YoutubePreviewData } from "./previewer"
import { cn } from "@/lib/utils"

interface YoutubePreviewCardProps {
    data: YoutubePreviewData
    isMobile: boolean
}

export function YoutubePreviewCard({ data, isMobile }: YoutubePreviewCardProps) {
    return (
        <motion.div
            layout
            className="origin-top"
            style={{
                transformOrigin: "center top",
            }}
            animate={{
                width: isMobile ? "375px" : "100%",
                maxWidth: isMobile ? "375px" : "800px",
                scale: isMobile ? 1 : 1, // We can add scale logic if needed
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
            <div className={cn(
                "bg-black overflow-hidden shadow-2xl relative group cursor-pointer",
                isMobile ? "rounded-[30px] border-[8px] border-zinc-800" : "rounded-xl"
            )}>
                {/* Mobile Status Bar (fake) */}
                {isMobile && (
                    <div className="h-6 w-full bg-black flex items-center justify-between px-6 absolute top-0 z-20 pointer-events-none">
                        <div className="text-[10px] text-white font-medium">9:41</div>
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-transparent border border-white/30" />
                            <div className="w-3 h-3 rounded-full bg-transparent border border-white/30" />
                        </div>
                    </div>
                )}

                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full bg-zinc-900 group-active:scale-[0.98] transition-transform duration-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={data.thumbnailUrl}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        crossOrigin={data.thumbnailUrl.startsWith("http") ? "anonymous" : undefined}
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded-[4px] tracking-wide">
                        12:45
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Metadata */}
                <div className={cn("p-3 flex gap-3 bg-[#0f0f0f] text-white min-h-[100px]", isMobile ? "pb-8" : "")}>
                    {/* Avatar */}
                    <div className="shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={data.avatarUrl}
                            alt="Avatar"
                            className={cn("rounded-full object-cover", isMobile ? "w-9 h-9" : "w-9 h-9")}
                            crossOrigin={data.avatarUrl.startsWith("http") ? "anonymous" : undefined}
                        />
                    </div>

                    <div className="flex-1 flex flex-col gap-1 pr-6 relative">
                        <h3 className="text-[14px] md:text-[16px] font-semibold leading-tight line-clamp-2 text-white group-hover:text-[#3ea6ff] transition-colors">
                            {data.title}
                        </h3>

                        <div className="text-[12px] md:text-[14px] text-[#aaaaaa] flex flex-wrap items-center gap-1">
                            <span>{data.channelName}</span>
                            <CheckCircle2 className="w-3 h-3 fill-[#aaaaaa] text-black" />
                            <span className="mx-1">•</span>
                            <span>{data.views}</span>
                            <span className="mx-1">•</span>
                            <span>{data.uploadedTime}</span>
                        </div>

                        <button className="absolute right-[-10px] top-0 text-white p-1 hover:text-[#aaaaaa]">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
