"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#studio", label: "Studio" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
]

type HeaderProps = {
  siteName: string
}

export function Header({ siteName }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-6">
        <Link href="/" className="hover:opacity-60 transition-opacity">
          <span className="text-base md:text-lg lg:text-xl tracking-[0.3em] font-light text-foreground">
            {siteName}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.2em] font-light text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 -mr-2 text-foreground"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg"
        >
          <div className="flex flex-col py-8 px-6">
            <p className="pb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Navigate
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-4 text-sm tracking-[0.2em] font-light text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-border last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
