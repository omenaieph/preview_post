"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Youtube, Linkedin, Activity, Zap, Instagram } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Select a tool to start previewing your content.</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <motion.div variants={item} className="md:col-span-2">
          <Link href="/youtube">
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg text-red-600">
                    <Youtube className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">Popular</span>
                </div>
                <CardTitle className="text-2xl">YouTube Previewer</CardTitle>
                <CardDescription>
                  Visualize your thumbnail and title exactly as they appear on YouTube. Optimize for CTR.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent">
                  Start Creating <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/linkedin">
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-600">
                    <Linkedin className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle>LinkedIn Hook</CardTitle>
                <CardDescription>
                  Check where your post truncates. Craft the perfect hook.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button variant="ghost" className="group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent">
                  Check Hook <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/tiktok">
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg text-pink-600">
                    <Activity className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle>TikTok Safe Zone</CardTitle>
                <CardDescription>
                  Prevent UI elements from blocking your content. Check safe areas.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button variant="ghost" className="group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent">
                  Check Safe Zone <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/x">
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle>X Preview</CardTitle>
                <CardDescription>
                  Preview tweets in Light, Dim, and Dark modes. Plan threads perfectly.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button variant="ghost" className="group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent">
                  Draft Tweet <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/instagram">
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg text-pink-600">
                    <Instagram className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle>Instagram Feed</CardTitle>
                <CardDescription>
                  Switch between 1:1 and 4:5 ratios. Preview carousels and your 3x3 grid.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button variant="ghost" className="group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent">
                  Plan Feed <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={item} className="md:col-span-2">
          <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-none">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2 text-white/80">
                <Zap className="h-5 w-5" />
                <span className="text-sm font-medium">Pro Tip</span>
              </div>
              <CardTitle className="text-white">Optimize for Dark Mode</CardTitle>
              <CardDescription className="text-indigo-100">
                Most developers use dark mode. Ensure your content pops on dark backgrounds by testing the contrast in preview.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
