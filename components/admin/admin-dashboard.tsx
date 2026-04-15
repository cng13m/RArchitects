"use client"

import { useState } from "react"
import Link from "next/link"

import { logout } from "@/app/admin/login/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { SiteContent } from "@/lib/site-content"

type Props = {
  initialContent: SiteContent
  userEmail: string
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

const STORAGE_BUCKET = "site-images"

function sanitizeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9.-]+/g, "-")
}

export function AdminDashboard({ initialContent, userEmail }: Props) {
  const [content, setContent] = useState(initialContent)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingField, setUploadingField] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function saveContent() {
    setIsSaving(true)
    setMessage(null)
    setError(null)

    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    })

    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null

    if (!response.ok) {
      setError(payload?.error || "Unable to save content.")
      setIsSaving(false)
      return
    }

    setMessage("Website content saved.")
    setIsSaving(false)
  }

  async function uploadImage(file: File, folder: string, fieldId: string) {
    setUploadingField(fieldId)
    setError(null)
    setMessage(null)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    const response = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    })

    const payload = (await response.json().catch(() => null)) as
      | { error?: string; url?: string }
      | null

    if (!response.ok || !payload?.url) {
      setUploadingField(null)
      setError(payload?.error || "Unable to upload image.")
      return null
    }

    setUploadingField(null)
    setMessage("Image uploaded. Save changes to publish it on the website.")
    return payload.url
  }

  function updateProject(
    index: number,
    field: "title" | "location" | "year" | "image" | "href",
    value: string,
  ) {
    const items = [...content.projects.items]
    items[index] = { ...items[index], [field]: value }
    setContent({ ...content, projects: { ...content.projects, items } })
  }

  function updateStudioValue(index: number, field: "title" | "description", value: string) {
    const values = [...content.studio.values]
    values[index] = { ...values[index], [field]: value }
    setContent({ ...content, studio: { ...content.studio, values } })
  }

  function updateNewsItem(
    index: number,
    field: "title" | "date" | "category" | "href",
    value: string,
  ) {
    const items = [...content.news.items]
    items[index] = { ...items[index], [field]: value }
    setContent({ ...content, news: { ...content.news, items } })
  }

  function updateSocialLink(index: number, field: "label" | "href", value: string) {
    const socialLinks = [...content.contact.socialLinks]
    socialLinks[index] = { ...socialLinks[index], [field]: value }
    setContent({ ...content, contact: { ...content.contact, socialLinks } })
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f3ec,#ffffff)] px-6 py-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Admin Dashboard
            </p>
            <h1 className="font-serif text-4xl font-light tracking-tight md:text-5xl">
              Edit the entire website from here.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Signed in as {userEmail}. Update text, links, project cards, news, contact
              details, and every image path used on the homepage.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/">View Website</Link>
            </Button>
            <form action={logout}>
              <Button type="submit" variant="ghost">
                Log Out
              </Button>
            </form>
            <Button type="button" onClick={saveContent} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {message ? <p className="mb-6 text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="mb-6 text-sm text-red-600">{error}</p> : null}

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Brand and footer text used across the site.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Field label="Site name">
                <Input
                  value={content.site.name}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      site: { ...content.site, name: event.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Copyright">
                <Input
                  value={content.site.copyright}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      site: { ...content.site, copyright: event.target.value },
                    })
                  }
                />
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hero</CardTitle>
              <CardDescription>Homepage image and overlay text.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Field label="Image path or URL">
                <ImageField
                  fieldId="hero-image"
                  folder="hero"
                  value={content.hero.image}
                  uploadingField={uploadingField}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, image: value },
                    })
                  }
                  onUpload={uploadImage}
                />
              </Field>
              <Field label="Image alt text">
                <Input
                  value={content.hero.alt}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, alt: event.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Eyebrow text">
                <Input
                  value={content.hero.eyebrow}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, eyebrow: event.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Scroll label">
                <Input
                  value={content.hero.scrollLabel}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, scrollLabel: event.target.value },
                    })
                  }
                />
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Add, remove, and edit all project cards.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Eyebrow">
                  <Input
                    value={content.projects.eyebrow}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        projects: { ...content.projects, eyebrow: event.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Title">
                  <Input
                    value={content.projects.title}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        projects: { ...content.projects, title: event.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="CTA label">
                  <Input
                    value={content.projects.ctaLabel}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        projects: { ...content.projects, ctaLabel: event.target.value },
                      })
                    }
                  />
                </Field>
              </div>

              <div className="space-y-4">
                {content.projects.items.map((project, index) => (
                  <EditableCard
                    key={project.id}
                    title={`Project ${index + 1}`}
                    onRemove={() =>
                      setContent({
                        ...content,
                        projects: {
                          ...content.projects,
                          items: content.projects.items.filter((item) => item.id !== project.id),
                        },
                      })
                    }
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Title">
                        <Input
                          value={project.title}
                          onChange={(event) => updateProject(index, "title", event.target.value)}
                        />
                      </Field>
                      <Field label="Location">
                        <Input
                          value={project.location}
                          onChange={(event) =>
                            updateProject(index, "location", event.target.value)
                          }
                        />
                      </Field>
                      <Field label="Year">
                        <Input
                          value={project.year}
                          onChange={(event) => updateProject(index, "year", event.target.value)}
                        />
                      </Field>
                      <Field label="Image path or URL">
                        <ImageField
                          fieldId={`project-image-${project.id}`}
                          folder="projects"
                          value={project.image}
                          uploadingField={uploadingField}
                          onChange={(value) => updateProject(index, "image", value)}
                          onUpload={uploadImage}
                        />
                      </Field>
                      <Field label="Project link">
                        <Input
                          value={project.href}
                          onChange={(event) => updateProject(index, "href", event.target.value)}
                        />
                      </Field>
                    </div>
                  </EditableCard>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setContent({
                      ...content,
                      projects: {
                        ...content.projects,
                        items: [
                          ...content.projects.items,
                          {
                            id: createId("project"),
                            title: "New Project",
                            location: "City, Country",
                            year: "2026",
                            image: "/images/project-cliff-house.jpg",
                            href: "#",
                          },
                        ],
                      },
                    })
                  }
                >
                  Add Project
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Studio</CardTitle>
              <CardDescription>Edit the main studio section and its content blocks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Eyebrow">
                  <Input
                    value={content.studio.eyebrow}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        studio: { ...content.studio, eyebrow: event.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Title">
                  <Input
                    value={content.studio.title}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        studio: { ...content.studio, title: event.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="CTA label">
                  <Input
                    value={content.studio.ctaLabel}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        studio: { ...content.studio, ctaLabel: event.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Image path or URL">
                  <ImageField
                    fieldId="studio-image"
                    folder="studio"
                    value={content.studio.image}
                    uploadingField={uploadingField}
                    onChange={(value) =>
                      setContent({
                        ...content,
                        studio: { ...content.studio, image: value },
                      })
                    }
                    onUpload={uploadImage}
                  />
                </Field>
                <Field label="Image alt text">
                  <Input
                    value={content.studio.imageAlt}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        studio: { ...content.studio, imageAlt: event.target.value },
                      })
                    }
                  />
                </Field>
              </div>

              <Field label="Intro text">
                <Textarea
                  className="min-h-32"
                  value={content.studio.intro}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      studio: { ...content.studio, intro: event.target.value },
                    })
                  }
                />
              </Field>

              <div className="space-y-4">
                {content.studio.values.map((value, index) => (
                  <EditableCard
                    key={value.id}
                    title={`Studio Block ${index + 1}`}
                    onRemove={() =>
                      setContent({
                        ...content,
                        studio: {
                          ...content.studio,
                          values: content.studio.values.filter((item) => item.id !== value.id),
                        },
                      })
                    }
                  >
                    <div className="grid gap-4">
                      <Field label="Title">
                        <Input
                          value={value.title}
                          onChange={(event) =>
                            updateStudioValue(index, "title", event.target.value)
                          }
                        />
                      </Field>
                      <Field label="Description">
                        <Textarea
                          className="min-h-24"
                          value={value.description}
                          onChange={(event) =>
                            updateStudioValue(index, "description", event.target.value)
                          }
                        />
                      </Field>
                    </div>
                  </EditableCard>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setContent({
                      ...content,
                      studio: {
                        ...content.studio,
                        values: [
                          ...content.studio.values,
                          {
                            id: createId("studio"),
                            title: "New Studio Block",
                            description: "Describe this part of the studio story.",
                          },
                        ],
                      },
                    })
                  }
                >
                  Add Studio Block
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>News</CardTitle>
              <CardDescription>Manage the homepage news list and links.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Eyebrow">
                  <Input
                    value={content.news.eyebrow}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        news: { ...content.news, eyebrow: event.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Title">
                  <Input
                    value={content.news.title}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        news: { ...content.news, title: event.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="CTA label">
                  <Input
                    value={content.news.ctaLabel}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        news: { ...content.news, ctaLabel: event.target.value },
                      })
                    }
                  />
                </Field>
              </div>

              <div className="space-y-4">
                {content.news.items.map((item, index) => (
                  <EditableCard
                    key={item.id}
                    title={`News Item ${index + 1}`}
                    onRemove={() =>
                      setContent({
                        ...content,
                        news: {
                          ...content.news,
                          items: content.news.items.filter((newsItem) => newsItem.id !== item.id),
                        },
                      })
                    }
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Title">
                        <Input
                          value={item.title}
                          onChange={(event) => updateNewsItem(index, "title", event.target.value)}
                        />
                      </Field>
                      <Field label="Category">
                        <Input
                          value={item.category}
                          onChange={(event) =>
                            updateNewsItem(index, "category", event.target.value)
                          }
                        />
                      </Field>
                      <Field label="Date">
                        <Input
                          value={item.date}
                          onChange={(event) => updateNewsItem(index, "date", event.target.value)}
                        />
                      </Field>
                      <Field label="Link">
                        <Input
                          value={item.href}
                          onChange={(event) => updateNewsItem(index, "href", event.target.value)}
                        />
                      </Field>
                    </div>
                  </EditableCard>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setContent({
                      ...content,
                      news: {
                        ...content.news,
                        items: [
                          ...content.news.items,
                          {
                            id: createId("news"),
                            title: "New announcement",
                            date: "April 15, 2026",
                            category: "Press",
                            href: "#",
                          },
                        ],
                      },
                    })
                  }
                >
                  Add News Item
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
              <CardDescription>Change the website contact section and social links.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Eyebrow">
                  <Input
                    value={content.contact.eyebrow}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, eyebrow: event.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Title">
                  <Input
                    value={content.contact.title}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, title: event.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Email">
                  <Input
                    value={content.contact.email}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, email: event.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    value={content.contact.phone}
                    onChange={(event) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, phone: event.target.value },
                      })
                    }
                  />
                </Field>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Address Lines</h3>
                {content.contact.addressLines.map((line, index) => (
                  <div key={`address-line-${index}`} className="flex gap-3">
                    <Input
                      value={line}
                      onChange={(event) => {
                        const addressLines = [...content.contact.addressLines]
                        addressLines[index] = event.target.value
                        setContent({
                          ...content,
                          contact: { ...content.contact, addressLines },
                        })
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setContent({
                          ...content,
                          contact: {
                            ...content.contact,
                            addressLines: content.contact.addressLines.filter(
                              (_, lineIndex) => lineIndex !== index,
                            ),
                          },
                        })
                      }
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        addressLines: [...content.contact.addressLines, "New address line"],
                      },
                    })
                  }
                >
                  Add Address Line
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Social Links</h3>
                {content.contact.socialLinks.map((link, index) => (
                  <EditableCard
                    key={link.id}
                    title={`Social Link ${index + 1}`}
                    onRemove={() =>
                      setContent({
                        ...content,
                        contact: {
                          ...content.contact,
                          socialLinks: content.contact.socialLinks.filter(
                            (socialLink) => socialLink.id !== link.id,
                          ),
                        },
                      })
                    }
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Label">
                        <Input
                          value={link.label}
                          onChange={(event) =>
                            updateSocialLink(index, "label", event.target.value)
                          }
                        />
                      </Field>
                      <Field label="URL">
                        <Input
                          value={link.href}
                          onChange={(event) =>
                            updateSocialLink(index, "href", event.target.value)
                          }
                        />
                      </Field>
                    </div>
                  </EditableCard>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        socialLinks: [
                          ...content.contact.socialLinks,
                          { id: createId("social"), label: "Social", href: "#" },
                        ],
                      },
                    })
                  }
                >
                  Add Social Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}</span>
      {children}
    </label>
  )
}

function ImageField({
  fieldId,
  folder,
  value,
  uploadingField,
  onChange,
  onUpload,
}: {
  fieldId: string
  folder: string
  value: string
  uploadingField: string | null
  onChange: (value: string) => void
  onUpload: (file: File, folder: string, fieldId: string) => Promise<string | null>
}) {
  const isUploading = uploadingField === fieldId

  return (
    <div className="space-y-3">
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
      <div className="flex flex-wrap items-center gap-3">
        <Input
          type="file"
          accept="image/*"
          className="max-w-sm"
          disabled={isUploading}
          onChange={async (event) => {
            const file = event.target.files?.[0]
            if (!file) {
              return
            }

            const uploadedUrl = await onUpload(file, folder, fieldId)
            if (uploadedUrl) {
              onChange(uploadedUrl)
            }

            event.target.value = ""
          }}
        />
        <span className="text-xs text-muted-foreground">
          {isUploading ? "Uploading..." : "Or upload a new image from your device."}
        </span>
      </div>
    </div>
  )
}

function EditableCard({
  children,
  onRemove,
  title,
}: {
  children: React.ReactNode
  onRemove: () => void
  title: string
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <Button type="button" variant="outline" onClick={onRemove}>
          Remove
        </Button>
      </div>
      {children}
    </div>
  )
}
