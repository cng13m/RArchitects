"use client"

import Link from "next/link"
import { useState } from "react"

const newsItems = [
  {
    id: 1,
    title: "House on the Cliff nominated for Architecture Awards 2026",
    date: "March 30, 2026",
    category: "Awards",
  },
  {
    id: 2,
    title: "Interview with Architectural Digest on sustainable design",
    date: "March 25, 2026",
    category: "Press",
  },
  {
    id: 3,
    title: "Villa Lago featured in European Architecture Biennale",
    date: "March 18, 2026",
    category: "Exhibition",
  },
  {
    id: 4,
    title: "Desert Pavilion receives German Design Award",
    date: "March 10, 2026",
    category: "Awards",
  },
  {
    id: 5,
    title: "Lecture at International Architecture Symposium, Milan",
    date: "February 28, 2026",
    category: "Events",
  },
]

export function News() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="news" className="py-32 px-6 md:px-12 lg:px-20">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-16">
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Latest
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            News
          </h2>
        </div>
        <Link
          href="#"
          className="hidden md:block text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
        >
          All News
        </Link>
      </div>

      {/* News List */}
      <div className="border-t border-border">
        {newsItems.map((item) => (
          <Link
            key={item.id}
            href="#"
            className="group block border-b border-border py-8 md:py-10"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3 block">
                  {item.category}
                </span>
                <h3 className={`font-serif text-lg md:text-xl font-light tracking-tight transition-colors ${
                  hoveredId === item.id ? 'text-foreground' : 'text-foreground/80'
                }`}>
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-xs tracking-[0.1em] text-muted-foreground">
                  {item.date}
                </span>
                <span className={`hidden md:block text-xs tracking-[0.2em] uppercase transition-opacity ${
                  hoveredId === item.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  Read →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile All News Link */}
      <div className="mt-12 md:hidden text-center">
        <Link
          href="#"
          className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
        >
          All News
        </Link>
      </div>
    </section>
  )
}
