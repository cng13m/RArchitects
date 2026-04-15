import { z } from "zod"

export const linkSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  href: z.string().min(1),
})

export const projectGalleryItemSchema = z.object({
  id: z.string().min(1),
  image: z.string().min(1),
  title: z.string().min(1).default("Project image"),
  description: z.string().min(1).default(""),
})

export const projectSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1).optional(),
    title: z.string().min(1),
    location: z.string().min(1),
    year: z.string().min(1),
    image: z.string().min(1),
    href: z.string().min(1).optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    gallery: z.array(projectGalleryItemSchema).optional(),
  })
  .transform((project) => {
    const slug = project.slug || project.id
    const summary =
      project.summary ||
      `${project.title} is a residential architecture project located in ${project.location}.`
    const description =
      project.description ||
      `${project.title} explores material warmth, site sensitivity, and a calm relationship between interior and landscape.`
    const gallery =
      project.gallery && project.gallery.length > 0
        ? project.gallery
        : [
            {
              id: `${project.id}-gallery-1`,
              image: project.image,
              title: project.title,
              description: summary,
            },
          ]

    return {
      ...project,
      slug,
      href: `/projects/${slug}`,
      summary,
      description,
      gallery,
    }
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
        id: "house-on-the-cliff",
        slug: "house-on-the-cliff",
        title: "House on the Cliff",
        location: "Costa Brava, Spain",
        year: "2024",
        image: "/images/project-cliff-house.jpg",
        href: "/projects/house-on-the-cliff",
        summary: "A dramatic coastal home shaped by sea views, stone terraces, and restrained modern detailing.",
        description:
          "This project balances shelter and openness along a rugged cliffside, using long horizontal lines, tactile stone surfaces, and framed views of the Mediterranean.",
        gallery: [
          {
            id: "cliff-1",
            image: "/images/project-cliff-house.jpg",
            title: "Arrival facade",
            description: "A low horizontal approach introduces the house as an extension of the cliff.",
          },
          {
            id: "cliff-2",
            image: "/images/project-coastal-villa.jpg",
            title: "Sea-facing terrace",
            description: "Outdoor living spaces step down toward the water and capture changing light.",
          },
        ],
      },
      {
        id: "villa-lago",
        slug: "villa-lago",
        title: "Villa Lago",
        location: "Lake Como, Italy",
        year: "2024",
        image: "/images/project-lake-villa.jpg",
        href: "/projects/villa-lago",
        summary: "A quiet lakefront residence composed around reflection, landscape, and soft natural materials.",
        description:
          "Villa Lago uses terraces, courtyards, and continuous glazing to connect interior life to the lake edge while maintaining a calm, intimate atmosphere.",
        gallery: [
          {
            id: "lago-1",
            image: "/images/project-lake-villa.jpg",
            title: "Lakeside elevation",
            description: "The primary facade opens gently to the water with deep overhangs and stone planes.",
          },
        ],
      },
      {
        id: "desert-pavilion",
        slug: "desert-pavilion",
        title: "Desert Pavilion",
        location: "Scottsdale, Arizona",
        year: "2023",
        image: "/images/project-desert-house.jpg",
        href: "/projects/desert-pavilion",
        summary: "A desert retreat shaped by shade, thermal mass, and long views across the landscape.",
        description:
          "This pavilion responds to the harsh climate with thick walls, shaded outdoor rooms, and a palette that sits naturally within the desert context.",
        gallery: [
          {
            id: "desert-1",
            image: "/images/project-desert-house.jpg",
            title: "Courtyard approach",
            description: "Protected outdoor rooms offer shade and privacy within a stark climate.",
          },
        ],
      },
      {
        id: "forest-retreat",
        slug: "forest-retreat",
        title: "Forest Retreat",
        location: "Aspen, Colorado",
        year: "2023",
        image: "/images/project-forest-retreat.jpg",
        href: "/projects/forest-retreat",
        summary: "A timber retreat immersed in woodland, designed around texture, warmth, and seasonal change.",
        description:
          "The house opens selectively to the forest, using natural materials and carefully framed openings to create a calm, restorative atmosphere.",
        gallery: [
          {
            id: "forest-1",
            image: "/images/project-forest-retreat.jpg",
            title: "Forest-facing volume",
            description: "A restrained silhouette allows the retreat to sit quietly among the trees.",
          },
        ],
      },
      {
        id: "coastal-villa",
        slug: "coastal-villa",
        title: "Coastal Villa",
        location: "Marbella, Spain",
        year: "2023",
        image: "/images/project-coastal-villa.jpg",
        href: "/projects/coastal-villa",
        summary: "A bright Mediterranean home with layered terraces and fluid indoor-outdoor living.",
        description:
          "The project uses softened geometry, pale materials, and cross-ventilated spaces to create an elegant but highly livable coastal residence.",
        gallery: [
          {
            id: "coastal-1",
            image: "/images/project-coastal-villa.jpg",
            title: "Main terrace",
            description: "Terraces extend the living spaces outward and soften the transition to the garden.",
          },
        ],
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
