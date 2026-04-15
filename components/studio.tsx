import Image from "next/image"
import Link from "next/link"

import type { SiteContent } from "@/lib/site-content"

type StudioProps = {
  content: SiteContent["studio"]
}

export function Studio({ content }: StudioProps) {
  return (
    <section id="studio" className="py-32 bg-secondary">
      <div className="px-6 md:px-12 lg:px-20">
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
            href="#"
            className="hidden md:block text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
          >
            {content.ctaLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[600px]">
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-serif text-2xl md:text-3xl font-light leading-relaxed text-foreground/90 mb-12">
              {content.intro}
            </p>

            <div className="space-y-10">
              {content.values.map((value) => (
                <div key={value.id} className="border-t border-border pt-6">
                  <h3 className="text-xs tracking-[0.2em] uppercase mb-4 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 lg:hidden text-center">
          <Link
            href="#"
            className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
          >
            {content.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
