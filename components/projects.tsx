"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import type { SiteContent } from "@/lib/site-content"

type ProjectsProps = {
  content: SiteContent["projects"]
}

export function Projects({ content }: ProjectsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const leadProjects = content.items.slice(0, 4)
  const spotlightProject = content.items[4]

  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-20">
      <div className="flex items-end justify-between mb-20">
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">
            {content.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            {content.title}
          </h2>
        </div>
        <Link
          href="/#projects"
          className="hidden md:block text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
        >
          {content.ctaLabel}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {leadProjects.map((project, index) => (
          <Link
            key={project.id}
            href={project.href}
            className={`group block ${index === 0 ? "md:col-span-2" : ""}`}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className={`relative overflow-hidden ${index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                unoptimized
                className={`object-cover transition-transform duration-700 ${
                  hoveredId === project.id ? "scale-105" : "scale-100"
                }`}
              />
              <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                hoveredId === project.id ? "opacity-20" : "opacity-0"
              }`} />
            </div>
            <div className="mt-6 flex items-start justify-between">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  {project.location}
                </p>
              </div>
              <span className="text-xs tracking-[0.1em] text-muted-foreground">
                {project.year}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {spotlightProject ? (
        <div className="mt-12">
          <Link
            href={spotlightProject.href}
            className="group block"
            onMouseEnter={() => setHoveredId(spotlightProject.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative overflow-hidden aspect-[21/9]">
              <Image
                src={spotlightProject.image}
                alt={spotlightProject.title}
                fill
                unoptimized
                className={`object-cover transition-transform duration-700 ${
                  hoveredId === spotlightProject.id ? "scale-105" : "scale-100"
                }`}
              />
              <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                hoveredId === spotlightProject.id ? "opacity-20" : "opacity-0"
              }`} />
            </div>
            <div className="mt-6 flex items-start justify-between">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-tight mb-2">
                  {spotlightProject.title}
                </h3>
                <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  {spotlightProject.location}
                </p>
              </div>
              <span className="text-xs tracking-[0.1em] text-muted-foreground">
                {spotlightProject.year}
              </span>
            </div>
          </Link>
        </div>
      ) : null}

      <div className="mt-16 md:hidden text-center">
        <Link
          href="/#projects"
          className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
        >
          {content.ctaLabel}
        </Link>
      </div>
    </section>
  )
}
