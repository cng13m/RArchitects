import Link from "next/link"

import { logout } from "@/app/admin/login/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAdmin } from "@/lib/admin-auth"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const user = await requireAdmin()

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f3ec,#ffffff)] px-6 py-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">Admin Dashboard</p>
            <h1 className="font-serif text-4xl font-light tracking-tight md:text-5xl">
              Auth is live and protecting this area.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Signed in as {user.email}. This page is now restricted to the single admin account configured in Supabase.
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
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>What is done</CardTitle>
              <CardDescription>Your Next.js app is now connected to Supabase Auth.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>The admin login page uses Supabase email/password authentication.</p>
              <p>The server checks the signed-in user and only allows the configured admin email.</p>
              <p>Supabase session cookies are refreshed through the project proxy.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next step</CardTitle>
              <CardDescription>Once your Supabase project is ready, we can connect editable website content here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>The natural next step is storing projects, studio, news, and contact content in Supabase tables.</p>
              <p>After that, this page becomes the real dashboard for adding and editing website content.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
