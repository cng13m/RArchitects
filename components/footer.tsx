import Link from "next/link"

const socialLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "Pinterest" },
  { href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 mb-24">
          {/* Main Contact */}
          <div className="lg:col-span-2">
            <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-6">
              Contact
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-8">
              {"Let's discuss your project"}
            </h2>
            <a 
              href="mailto:studio@rarchitects.com"
              className="text-lg md:text-xl font-light tracking-wide opacity-80 hover:opacity-100 transition-opacity"
            >
              studio@rarchitects.com
            </a>
          </div>

          {/* Address */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-6">
              Studio
            </p>
            <address className="not-italic text-sm leading-relaxed opacity-80">
              <p>Carrer de la Arquitectura 45</p>
              <p>46001 Valencia, Spain</p>
              <p className="mt-4">+34 963 00 00 00</p>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-primary-foreground/20 mb-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo */}
          <Link 
            href="/"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <span className="text-sm tracking-[0.3em] font-light">
              RARCHITECTS
            </span>
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase opacity-60 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs tracking-[0.1em] opacity-40">
            © 2026 RArchitects. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
