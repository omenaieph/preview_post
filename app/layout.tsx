import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainSidebar } from "@/components/main-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import CookieConsent from "react-cookie-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PreviewPost - Social Media Post Preview Tool",
  description: "Check exactly how your posts will look on LinkedIn, X, TikTok, YouTube, and Instagram before you hit publish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <MainSidebar />
            <MobileNav />
            <main className="flex-1 transition-all duration-300 ease-in-out md:pl-64 pt-16 md:pt-0">
              {children}
            </main>
          </div>
          <CookieConsent
            location="bottom"
            buttonText="I understand"
            cookieName="previewpost_cookie"
            style={{ background: "#09090b", borderTop: "1px solid #27272a" }}
            buttonStyle={{ background: "#ffffff", color: "#000000", fontSize: "13px", borderRadius: "4px", fontWeight: "600" }}
            expires={150}
          >
            We use cookies to enhance the user experience and analyze traffic.{" "}
          </CookieConsent>
        </ThemeProvider>
      </body>
    </html>
  );
}
