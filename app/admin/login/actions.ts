"use server"

import { redirect } from "next/navigation"

import { getAdminEmail } from "@/lib/admin-auth"
import { createClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = String(formData.get("email") || "").trim().toLowerCase()
  const password = String(formData.get("password") || "")

  if (!email || !password) {
    redirect("/admin/login?error=missing_fields")
  }

  if (email !== getAdminEmail()) {
    redirect("/admin/login?error=not_admin")
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect("/admin/login?error=invalid_credentials")
  }

  redirect("/admin")
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/login?logged_out=1")
}
