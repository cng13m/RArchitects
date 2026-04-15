import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Studio } from "@/components/studio"
import { News } from "@/components/news"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Projects />
      <Studio />
      <News />
      <Footer />
    </main>
  )
}
