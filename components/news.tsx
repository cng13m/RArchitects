"use client"

import Link from "next/link"
import { useState } from "react"

import type { SiteContent } from "@/lib/site-content"

type NewsProps = {
  content: SiteContent["news"]
}

export function News({ content }: NewsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section id="news" className="py-32 px-6 md:px-12 lg:px-20">
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">
            {content.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            {content.title}
          </h2>
        </div>
        <Link
          href="#"
          className="hidden md:block text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
        >
          {content.ctaLabel}
        </Link>
      </div>

      <div className="border-t border-border">
        {content.items.map((item) => (
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
        ))}
      </div>

      <div className="mt-12 md:hidden text-center">
        <Link
          href="#"
          className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
        >
          {content.ctaLabel}
        </Link>
      </div>
    </section>
  )
}
