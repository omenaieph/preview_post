"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LayoutGrid, Youtube, Linkedin, Music, Activity, Instagram, Monitor, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const navItems = [
        { href: "/", label: "Dashboard", icon: LayoutGrid },
        { href: "/youtube", label: "YouTube Preview", icon: Youtube },
        { href: "/linkedin", label: "LinkedIn Hook", icon: Linkedin },
        { href: "/tiktok", label: "TikTok Safe Zone", icon: Music },
        { href: "/x", label: "X Preview", icon: Activity },
        { href: "/instagram", label: "Instagram Feed", icon: Instagram },
        { href: "/privacy", label: "Privacy Policy", icon: Monitor },
        { href: "mailto:ephraimsdesign@gmail.com", label: "Support", icon: Mail },
    ]

    return (
        <div className="md:hidden">
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-16 border-b bg-background/80 backdrop-blur-md">
                <Link href="/" onClick={() => setIsOpen(false)}>
                    <Logo iconOnly className="h-8" />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </header>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-background pt-16 animate-in slide-in-from-top duration-200">
                    <nav className="flex flex-col p-4 gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                                    <Button
                                        variant={isActive ? "secondary" : "ghost"}
                                        className={cn(
                                            "w-full justify-start gap-3 h-12 text-lg",
                                            isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Button>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            )}
        </div>
    )
}
