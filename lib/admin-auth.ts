import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.toLowerCase() || ""
}

export async function getAdminUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return null
  }

  if (user.email.toLowerCase() !== getAdminEmail()) {
    return null
  }

  return user
}

export async function requireAdmin() {
  const user = await getAdminUser()

  if (!user) {
    redirect("/admin/login")
  }

  return user
}
