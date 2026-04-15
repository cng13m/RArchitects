import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { News } from "@/components/news"
import { Projects } from "@/components/projects"
import { Studio } from "@/components/studio"
import { getSiteContent } from "@/lib/content-store"

export const dynamic = "force-dynamic"

export default async function Home() {
  const content = await getSiteContent()

  return (
    <main className="min-h-screen">
      <Header siteName={content.site.name} />
      <Hero content={content.hero} />
      <Projects content={content.projects} />
      <Studio content={content.studio} />
      <News content={content.news} />
      <Footer
        siteName={content.site.name}
        content={content.contact}
        copyright={content.site.copyright}
      />
    </main>
  )
}
