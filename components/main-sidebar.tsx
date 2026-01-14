"use client"

import { useEffect, useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Linkedin, Youtube, Moon, Sun, Monitor, Music, Activity, Instagram, Mail } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function MainSidebar() {
    const pathname = usePathname()
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const navItems = [
        { href: "/", label: "Dashboard", icon: LayoutGrid },
        { href: "/youtube", label: "YouTube Preview", icon: Youtube },
        { href: "/linkedin", label: "LinkedIn Hook", icon: Linkedin },
        { href: "/tiktok", label: "TikTok Safe Zone", icon: Music },
        { href: "/x", label: "X Preview", icon: Activity },
        { href: "/instagram", label: "Instagram Feed", icon: Instagram },
        { href: "/privacy", label: "Privacy Policy", icon: Monitor },
        { href: "mailto:previewpost.help@gmail.com", label: "Support", icon: Mail },
    ]

    return (
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
            <div className="flex h-full flex-col px-4 py-6">
                <div className="mb-8 px-2">
                    <Logo />
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start gap-3 px-3",
                                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Button>
                            </Link>
                        )
                    })}
                </nav>

                <div className="border-t border-sidebar-border pt-4 mt-auto">
                    <div className="px-3 pb-4">
                        <p className="text-[10px] leading-tight text-muted-foreground/60 select-none">
                            <span className="font-bold block mb-1">Disclaimer:</span>
                            Not affiliated with, authorized, or endorsed by TikTok, YouTube, Instagram, LinkedIn, or X. All trademarks belong to their respective owners.
                        </p>
                    </div>

                    <div className="px-2 pb-2 text-xs font-medium text-muted-foreground uppercase">
                        Theme
                    </div>
                    <div className="flex gap-1 p-1 bg-sidebar-accent/50 rounded-lg">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn("flex-1 h-8 rounded-md", mounted && theme === "light" && "bg-background shadow-sm")}
                            onClick={() => setTheme("light")}
                        >
                            <Sun className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn("flex-1 h-8 rounded-md", mounted && theme === "dark" && "bg-background shadow-sm")}
                            onClick={() => setTheme("dark")}
                        >
                            <Moon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn("flex-1 h-8 rounded-md", mounted && theme === "system" && "bg-background shadow-sm")}
                            onClick={() => setTheme("system")}
                        >
                            <Monitor className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    )
}
