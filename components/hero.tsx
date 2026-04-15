import Image from "next/image"

export function Hero() {
  return (
    <section className="relative h-screen w-full">
      {/* Hero Image */}
      <Image
        src="/images/hero-architecture.jpg"
        alt="Modern minimalist architecture overlooking the sea"
        fill
        className="object-cover"
        priority
        quality={90}
      />
      
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Minimal Text */}
      <div className="absolute bottom-16 left-6 md:left-12 lg:left-20">
        <p className="text-white/90 text-xs tracking-[0.3em] font-light uppercase mb-2">
          Architecture · Design · Innovation
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 right-6 md:right-12 lg:right-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase font-light">Scroll</span>
          <div className="w-px h-12 bg-white/30" />
        </div>
      </div>
    </section>
  )
}
