import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    iconOnly?: boolean
}

export function Logo({ className, iconOnly = false }: LogoProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm overflow-hidden">
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                >
                    {/* Outer Ring / Eye Shape */}
                    <path
                        d="M20 50C20 50 35 25 50 25C65 25 80 50 80 50C80 50 65 75 50 75C35 75 20 50 20 50Z"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    {/* Inner Pupil */}
                    <circle cx="50" cy="50" r="10" fill="currentColor" />
                    {/* Subtle Accent Dots (Matching the design's "breaks" or stylization) */}
                    <path
                        d="M15 50C15 50 30 20 50 20C70 20 85 50 85 50"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        className="opacity-40"
                    />
                </svg>
            </div>
            {!iconOnly && (
                <span className="text-lg font-bold tracking-tight">PreviewPost</span>
            )}
        </div>
    )
}
