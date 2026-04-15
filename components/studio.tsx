import Image from "next/image"
import Link from "next/link"

import { Reveal } from "@/components/reveal"
import type { SiteContent } from "@/lib/site-content"

type StudioProps = {
  content: SiteContent["studio"]
}

export function Studio({ content }: StudioProps) {
  const hasCta = content.ctaLabel.trim().length > 0 && content.ctaLabel !== "Learn More"

  return (
    <section id="studio" className="py-32 bg-secondary">
      <div className="px-6 md:px-12 lg:px-20">
        <Reveal className="mb-20 flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">
              {content.eyebrow}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              {content.title}
            </h2>
          </div>
          {hasCta ? (
            <Link
              href="#studio"
              className="hidden md:block text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
            >
              {content.ctaLabel}
            </Link>
          ) : null}
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <Reveal className="relative aspect-[4/5] lg:aspect-auto lg:h-[600px]">
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              unoptimized
              className="object-cover"
            />
          </Reveal>

          <div className="flex flex-col justify-center">
            <Reveal delay={120}>
              <p className="mb-12 font-serif text-2xl font-light leading-relaxed text-foreground/90 md:text-3xl">
                {content.intro}
              </p>
            </Reveal>

            <div className="space-y-10">
              {content.values.map((value, index) => (
                <Reveal key={value.id} delay={180 + index * 110}>
                  <div className="border-t border-border pt-6">
                    <h3 className="text-xs tracking-[0.2em] uppercase mb-4 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {hasCta ? (
          <Reveal className="mt-16 text-center lg:hidden" delay={280}>
            <Link
              href="#studio"
              className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
            >
              {content.ctaLabel}
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
