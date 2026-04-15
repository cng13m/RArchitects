"use client"

import Link from "next/link"
import { useState } from "react"

import { Reveal } from "@/components/reveal"
import type { SiteContent } from "@/lib/site-content"

type NewsProps = {
  content: SiteContent["news"]
}

export function News({ content }: NewsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const hasNewsListing = content.items.some((item) => item.href && item.href !== "#")

  return (
    <section id="news" className="py-32 px-6 md:px-12 lg:px-20">
      <Reveal className="mb-16 flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">
            {content.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            {content.title}
          </h2>
        </div>
        {hasNewsListing ? (
          <span className="hidden md:block text-xs tracking-[0.2em] text-muted-foreground uppercase border-b border-muted-foreground pb-1">
            {content.ctaLabel}
          </span>
        ) : null}
      </Reveal>

      <div className="border-t border-border">
        {content.items.map((item, index) => (
          <Reveal key={item.id} delay={index * 90}>
            <Link
            key={item.id}
            href={item.href}
            className="group block border-b border-border py-8 md:py-10"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3 block">
                  {item.category}
                </span>
                <h3
                  className={`font-serif text-lg md:text-xl font-light tracking-tight transition-colors ${
                    hoveredId === item.id ? "text-foreground" : "text-foreground/80"
                  }`}
                >
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-xs tracking-[0.1em] text-muted-foreground">
                  {item.date}
                </span>
                <span
                  className={`hidden md:block text-xs tracking-[0.2em] uppercase transition-opacity ${
                    hoveredId === item.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Read -&gt;
                </span>
              </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {hasNewsListing ? (
        <Reveal className="mt-12 text-center md:hidden" delay={320}>
          <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase border-b border-muted-foreground pb-1">
            {content.ctaLabel}
          </span>
        </Reveal>
      ) : null}
    </section>
  )
}
