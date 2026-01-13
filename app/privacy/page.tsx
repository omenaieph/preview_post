import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
    return (
        <div className="container max-w-4xl py-12 px-6">
            <Card className="border-sidebar-border bg-sidebar/50 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                    <section>
                        <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
                        <p>
                            Welcome to PreviewPost. We value your privacy and are committed to protecting any information you share with us.
                            This tool is designed to work entirely in your browser.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground">2. Data Collection</h2>
                        <p>
                            PreviewPost does not collect, store, or share any personal data or images you upload.
                            All image processing happens locally on your device.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground">3. External Links</h2>
                        <p>
                            Our service may contain links to other sites. We are not responsible for the privacy practices of those sites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-foreground">4. Trademarks</h2>
                        <p>
                            PreviewPost is not affiliated with, authorized, maintained, sponsored or endorsed by YouTube, LinkedIn, TikTok, X (Twitter), or Instagram.
                        </p>
                    </section>
                </CardContent>
            </Card>
        </div>
    )
}
