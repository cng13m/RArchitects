import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

import { getAdminEmail } from "@/lib/admin-auth"
import { saveSiteContent } from "@/lib/content-store"
import { createClient } from "@/lib/supabase/server"
import { siteContentSchema } from "@/lib/site-content"

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email || user.email.toLowerCase() !== getAdminEmail()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const payload = await request.json()
  const parsed = siteContentSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid content payload" }, { status: 400 })
  }

  try {
    await saveSiteContent(parsed.data)
    revalidatePath("/")
    revalidatePath("/admin")
    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save content."

    return NextResponse.json(
      {
        error:
          message.includes("relation") || message.includes("policy")
            ? "Supabase content table is not ready yet. Run the SQL setup script first."
            : message,
      },
      { status: 500 },
    )
  }
}
