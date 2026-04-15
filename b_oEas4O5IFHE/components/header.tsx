"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#studio", label: "Studio" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="hover:opacity-60 transition-opacity"
        >
          <span className="text-base md:text-lg lg:text-xl tracking-[0.3em] font-light text-foreground">
            RARCHITECTS
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 -mr-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border">
          <div className="flex flex-col py-8 px-6">
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
