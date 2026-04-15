"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import type { SiteContent } from "@/lib/site-content"

type ProjectItem = SiteContent["projects"]["items"][number]

export function ProjectDetailView({ project }: { project: ProjectItem }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = project.gallery[activeIndex]
  const isFirstImage = activeIndex === 0
  const isLastImage = activeIndex === project.gallery.length - 1

  function move(direction: "prev" | "next") {
    setActiveIndex((current) => {
      if (direction === "prev") {
        return current === 0 ? 0 : current - 1
      }

      return current === project.gallery.length - 1 ? current : current + 1
    })
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current === 0 ? 0 : current - 1))
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === project.gallery.length - 1 ? current : current + 1,
        )
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [project.gallery.length])

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f3ec,#ffffff)] px-6 pb-20 pt-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link href="/#projects" className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Back to Projects
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {project.location} / {project.year}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.7fr)] lg:items-start">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-[16/10]">
                <Image
                  src={activeImage.image}
                  alt={activeImage.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => move("prev")}
                disabled={isFirstImage}
                className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => move("next")}
                disabled={isLastImage}
                className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
              <p className="flex items-center text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Image {activeIndex + 1} / {project.gallery.length}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 lg:hidden">
              <h2 className="font-serif text-2xl font-light">{activeImage.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{activeImage.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`overflow-hidden rounded-xl border text-left transition ${
                    activeIndex === index ? "border-foreground" : "border-border hover:border-foreground/40"
                  }`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image src={item.image} alt={item.title} fill unoptimized className="object-cover" />
                  </div>
                  <div className={`p-3 ${activeIndex === index ? "bg-secondary" : ""}`}>
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-muted-foreground">Project</p>
            <h1 className="font-serif text-4xl font-light tracking-tight md:text-5xl">{project.title}</h1>
            <p className="mt-6 text-base leading-7 text-foreground/80">{project.summary}</p>
            <div className="mt-8 hidden border-t border-border pt-8 lg:block">
              <h2 className="font-serif text-2xl font-light">{activeImage.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{activeImage.description}</p>
            </div>
            <div className="mt-8 border-t border-border pt-8">
              <h2 className="font-serif text-2xl font-light">Overview</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.description}</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
