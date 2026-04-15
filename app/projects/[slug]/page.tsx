import { notFound } from "next/navigation"

import { ProjectDetailView } from "@/components/projects-detail-view"
import { getSiteContent } from "@/lib/content-store"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const content = await getSiteContent()
  const project = content.projects.items.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailView project={project} />
}
