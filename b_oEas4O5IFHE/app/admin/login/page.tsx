import Link from "next/link"
import { redirect } from "next/navigation"

import { login } from "@/app/admin/login/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getAdminUser } from "@/lib/admin-auth"

type AdminLoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const user = await getAdminUser()

  if (user) {
    redirect("/admin")
  }

  const params = await searchParams
  const error = readParam(params.error)
  const loggedOut = readParam(params.logged_out)

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.68)),url('/images/hero-architecture.jpg')] bg-cover bg-center px-6 py-10 text-white md:px-12 lg:px-20">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12">
        <div className="hidden max-w-2xl lg:block">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/60">Supabase Admin</p>
          <h1 className="font-serif text-6xl font-light tracking-tight">
            One login for the admin dashboard.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/70">
            This login is now wired to Supabase Auth. Only the email that matches your
            <code className="mx-1 rounded bg-white/10 px-2 py-1 text-sm">ADMIN_EMAIL</code>
            environment variable is allowed into the admin area.
          </p>
        </div>

        <Card className="w-full max-w-md border-white/10 bg-white/95 text-foreground shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Sign in with the one Supabase admin account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={login} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Admin email
                </label>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                />
              </div>

              {error === "missing_fields" ? (
                <p className="text-sm text-red-600">Enter both email and password.</p>
              ) : null}
              {error === "not_admin" ? (
                <p className="text-sm text-red-600">That email is not the configured admin account.</p>
              ) : null}
              {error === "invalid_credentials" ? (
                <p className="text-sm text-red-600">Supabase rejected the login details.</p>
              ) : null}
              {loggedOut === "1" ? (
                <p className="text-sm text-emerald-700">You have been signed out.</p>
              ) : null}

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">
              <p>After Supabase is configured, go to <strong>Auth &gt; Users</strong> and create the single admin user there.</p>
              <p className="mt-2">
                Public site: <Link href="/" className="underline underline-offset-4">return home</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
