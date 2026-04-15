import Link from "next/link"

import { Reveal } from "@/components/reveal"
import type { SiteContent } from "@/lib/site-content"

type FooterProps = {
  siteName: string
  content: SiteContent["contact"]
  copyright: string
}

export function Footer({ siteName, content, copyright }: FooterProps) {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 mb-24">
          <Reveal className="lg:col-span-2">
            <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-6">
              {content.eyebrow}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-8">
              {content.title}
            </h2>
            <a
              href={`mailto:${content.email}`}
              className="text-lg md:text-xl font-light tracking-wide opacity-80 hover:opacity-100 transition-opacity"
            >
              {content.email}
            </a>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-6">Studio</p>
            <address className="not-italic text-sm leading-relaxed opacity-80">
              {content.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="mt-4">{content.phone}</p>
            </address>
          </Reveal>
        </div>

        <Reveal className="mb-12 h-px w-full bg-primary-foreground/20" delay={180} />

        <Reveal
          className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
          delay={240}
        >
          <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-sm tracking-[0.3em] font-light">{siteName}</span>
          </Link>

          <div className="flex items-center gap-8">
            {content.socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase opacity-60 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-xs tracking-[0.1em] opacity-40">{copyright}</p>
        </Reveal>
      </div>
    </footer>
  )
}
