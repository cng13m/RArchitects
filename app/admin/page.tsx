import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { requireAdmin } from "@/lib/admin-auth"
import { getSiteContent } from "@/lib/content-store"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const user = await requireAdmin()
  const content = await getSiteContent()

  return <AdminDashboard initialContent={content} userEmail={user.email || ""} />
}
