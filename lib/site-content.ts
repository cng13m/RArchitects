import { z } from "zod"

export const linkSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1),
})

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1),
  year: z.string().min(1),
  image: z.string().min(1),
  href: z.string().min(1),
})

export const studioValueSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
})

export const newsItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  date: z.string().min(1),
  category: z.string().min(1),
  href: z.string().min(1),
})

export const siteContentSchema = z.object({
  site: z.object({
    name: z.string().min(1),
    copyright: z.string().min(1),
  }),
  hero: z.object({
    image: z.string().min(1),
    alt: z.string().min(1),
    eyebrow: z.string().min(1),
    scrollLabel: z.string().min(1),
  }),
  projects: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    ctaLabel: z.string().min(1),
    items: z.array(projectSchema),
  }),
  studio: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    ctaLabel: z.string().min(1),
    image: z.string().min(1),
    imageAlt: z.string().min(1),
    intro: z.string().min(1),
    values: z.array(studioValueSchema),
  }),
  news: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    ctaLabel: z.string().min(1),
    items: z.array(newsItemSchema),
  }),
  contact: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    email: z.string().min(1),
    phone: z.string().min(1),
    addressLines: z.array(z.string().min(1)),
    socialLinks: z.array(linkSchema),
  }),
})

export type SiteContent = z.infer<typeof siteContentSchema>

export const defaultSiteContent: SiteContent = {
  site: {
    name: "RARCHITECTS",
    copyright: "© 2026 RArchitects. All rights reserved.",
  },
  hero: {
    image: "/images/hero-architecture.jpg",
    alt: "Modern minimalist architecture overlooking the sea",
    eyebrow: "Architecture · Design · Innovation",
    scrollLabel: "Scroll",
  },
  projects: {
    eyebrow: "Selected Work",
    title: "Projects",
    ctaLabel: "View All Projects",
    items: [
      {
        id: "project-1",
        title: "House on the Cliff",
        location: "Costa Brava, Spain",
        year: "2024",
        image: "/images/project-cliff-house.jpg",
        href: "#",
      },
      {
        id: "project-2",
        title: "Villa Lago",
        location: "Lake Como, Italy",
        year: "2024",
        image: "/images/project-lake-villa.jpg",
        href: "#",
      },
      {
        id: "project-3",
        title: "Desert Pavilion",
        location: "Scottsdale, Arizona",
        year: "2023",
        image: "/images/project-desert-house.jpg",
        href: "#",
      },
      {
        id: "project-4",
        title: "Forest Retreat",
        location: "Aspen, Colorado",
        year: "2023",
        image: "/images/project-forest-retreat.jpg",
        href: "#",
      },
      {
        id: "project-5",
        title: "Coastal Villa",
        location: "Marbella, Spain",
        year: "2023",
        image: "/images/project-coastal-villa.jpg",
        href: "#",
      },
    ],
  },
  studio: {
    eyebrow: "About",
    title: "Studio",
    ctaLabel: "Learn More",
    image: "/images/studio.jpg",
    imageAlt: "RArchitects studio workspace",
    intro:
      "RArchitects is an architecture and design studio formed by a multidisciplinary group of professionals who carry out residential, cultural, corporate and public projects internationally.",
    values: [
      {
        id: "studio-1",
        title: "Philosophy",
        description:
          "Architecture arises from a commitment to give technical response to context while seeking beauty through built form. Each project pursues continuity with environment, space, and time.",
      },
      {
        id: "studio-2",
        title: "Approach",
        description:
          "Innovation through new materials and technologies combined with precision craftsmanship. Values of dialogue, economy, and shared creativity guide every endeavor.",
      },
      {
        id: "studio-3",
        title: "Excellence",
        description:
          "A multidisciplinary team united by passion for design excellence. Active participation, collaboration, and dedication to craft form the essence of our practice.",
      },
    ],
  },
  news: {
    eyebrow: "Latest",
    title: "News",
    ctaLabel: "All News",
    items: [
      {
        id: "news-1",
        title: "House on the Cliff nominated for Architecture Awards 2026",
        date: "March 30, 2026",
        category: "Awards",
        href: "#",
      },
      {
        id: "news-2",
        title: "Interview with Architectural Digest on sustainable design",
        date: "March 25, 2026",
        category: "Press",
        href: "#",
      },
      {
        id: "news-3",
        title: "Villa Lago featured in European Architecture Biennale",
        date: "March 18, 2026",
        category: "Exhibition",
        href: "#",
      },
      {
        id: "news-4",
        title: "Desert Pavilion receives German Design Award",
        date: "March 10, 2026",
        category: "Awards",
        href: "#",
      },
      {
        id: "news-5",
        title: "Lecture at International Architecture Symposium, Milan",
        date: "February 28, 2026",
        category: "Events",
        href: "#",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's discuss your project",
    email: "studio@rarchitects.com",
    phone: "+34 963 00 00 00",
    addressLines: ["Carrer de la Arquitectura 45", "46001 Valencia, Spain"],
    socialLinks: [
      { id: "social-1", label: "Instagram", href: "#" },
      { id: "social-2", label: "Pinterest", href: "#" },
      { id: "social-3", label: "LinkedIn", href: "#" },
    ],
  },
}
