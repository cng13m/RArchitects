import Image from "next/image"
import Link from "next/link"

const values = [
  {
    title: "Philosophy",
    description: "Architecture arises from a commitment to give technical response to context while seeking beauty through built form. Each project pursues continuity with environment, space, and time.",
  },
  {
    title: "Approach",
    description: "Innovation through new materials and technologies combined with precision craftsmanship. Values of dialogue, economy, and shared creativity guide every endeavor.",
  },
  {
    title: "Excellence",
    description: "A multidisciplinary team united by passion for design excellence. Active participation, collaboration, and dedication to craft form the essence of our practice.",
  },
]

export function Studio() {
  return (
    <section id="studio" className="py-32 bg-secondary">
      <div className="px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">
              About
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              Studio
            </h2>
          </div>
          <Link
            href="#"
            className="hidden md:block text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
          >
            Learn More
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image */}
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[600px]">
            <Image
              src="/images/studio.jpg"
              alt="NOVO Arquitectos studio workspace"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <p className="font-serif text-2xl md:text-3xl font-light leading-relaxed text-foreground/90 mb-12">
              NOVO Arquitectos is an architecture and design studio formed by a multidisciplinary group of professionals who carry out residential, cultural, corporate and public projects internationally.
            </p>

            <div className="space-y-10">
              {values.map((value) => (
                <div key={value.title} className="border-t border-border pt-6">
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

        {/* Mobile Learn More Link */}
        <div className="mt-16 lg:hidden text-center">
          <Link
            href="#"
            className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
