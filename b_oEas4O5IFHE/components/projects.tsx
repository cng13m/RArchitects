"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const projects = [
  {
    id: 1,
    title: "House on the Cliff",
    location: "Costa Brava, Spain",
    year: "2024",
    image: "/images/project-cliff-house.jpg",
  },
  {
    id: 2,
    title: "Villa Lago",
    location: "Lake Como, Italy",
    year: "2024",
    image: "/images/project-lake-villa.jpg",
  },
  {
    id: 3,
    title: "Desert Pavilion",
    location: "Scottsdale, Arizona",
    year: "2023",
    image: "/images/project-desert-house.jpg",
  },
  {
    id: 4,
    title: "Forest Retreat",
    location: "Aspen, Colorado",
    year: "2023",
    image: "/images/project-forest-retreat.jpg",
  },
  {
    id: 5,
    title: "Coastal Villa",
    location: "Marbella, Spain",
    year: "2023",
    image: "/images/project-coastal-villa.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-20">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-20">
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            Projects
          </h2>
        </div>
        <Link
          href="#"
          className="hidden md:block text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
        >
          View All Projects
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.slice(0, 4).map((project, index) => (
          <Link
            key={project.id}
            href="#"
            className={`group block ${index === 0 ? 'md:col-span-2' : ''}`}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`object-cover transition-transform duration-700 ${
                  hoveredId === project.id ? 'scale-105' : 'scale-100'
                }`}
              />
              <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                hoveredId === project.id ? 'opacity-20' : 'opacity-0'
              }`} />
            </div>
            <div className="mt-6 flex items-start justify-between">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  {project.location}
                </p>
              </div>
              <span className="text-xs tracking-[0.1em] text-muted-foreground">
                {project.year}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Fifth Project - Full Width */}
      <div className="mt-12">
        <Link
          href="#"
          className="group block"
          onMouseEnter={() => setHoveredId(projects[4].id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="relative overflow-hidden aspect-[21/9]">
            <Image
              src={projects[4].image}
              alt={projects[4].title}
              fill
              className={`object-cover transition-transform duration-700 ${
                hoveredId === projects[4].id ? 'scale-105' : 'scale-100'
              }`}
            />
            <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${
              hoveredId === projects[4].id ? 'opacity-20' : 'opacity-0'
            }`} />
          </div>
          <div className="mt-6 flex items-start justify-between">
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-light tracking-tight mb-2">
                {projects[4].title}
              </h3>
              <p className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
                {projects[4].location}
              </p>
            </div>
            <span className="text-xs tracking-[0.1em] text-muted-foreground">
              {projects[4].year}
            </span>
          </div>
        </Link>
      </div>

      {/* Mobile View All Link */}
      <div className="mt-16 md:hidden text-center">
        <Link
          href="#"
          className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors uppercase border-b border-muted-foreground hover:border-foreground pb-1"
        >
          View All Projects
        </Link>
      </div>
    </section>
  )
}
