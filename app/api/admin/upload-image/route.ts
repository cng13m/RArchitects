import { NextResponse } from "next/server"

import { getAdminEmail } from "@/lib/admin-auth"
import { createClient } from "@/lib/supabase/server"

const STORAGE_BUCKET = "site-images"

function sanitizeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9.-]+/g, "-")
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email || user.email.toLowerCase() !== getAdminEmail()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file")
  const folder = String(formData.get("folder") || "general")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file received." }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const filePath = `${folder}/${Date.now()}-${sanitizeFileName(file.name)}`

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, buffer, {
      contentType: file.type || "application/octet-stream",
      cacheControl: "3600",
      upsert: false,
    })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath)

  return NextResponse.json({ url: publicUrl })
}
