import Image from "next/image"

import type { SiteContent } from "@/lib/site-content"

type HeroProps = {
  content: SiteContent["hero"]
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative h-[82svh] min-h-[42rem] w-full md:h-screen">
      <Image
        src={content.image}
        alt={content.alt}
        fill
        className="object-cover"
        priority
        quality={90}
        unoptimized
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.16),rgba(10,10,10,0.1)_45%,rgba(10,10,10,0.38))]" />

      <div className="absolute bottom-24 left-6 right-20 md:bottom-16 md:left-12 md:right-auto lg:left-20">
        <p className="text-white/90 text-xs tracking-[0.3em] font-light uppercase mb-2">
          {content.eyebrow}
        </p>
      </div>

      <div className="absolute bottom-10 right-6 md:bottom-16 md:right-12 lg:right-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase font-light">
            {content.scrollLabel}
          </span>
          <div className="w-px h-12 bg-white/30" />
        </div>
      </div>
    </section>
  )
}
