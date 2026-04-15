import { cache } from "react"

import { createClient } from "@/lib/supabase/server"
import { defaultSiteContent, siteContentSchema, type SiteContent } from "@/lib/site-content"

const SITE_CONTENT_ROW_ID = "global"

type SiteContentRow = {
  id: string
  content: SiteContent
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", SITE_CONTENT_ROW_ID)
    .maybeSingle<Pick<SiteContentRow, "content">>()

  if (error || !data?.content) {
    return defaultSiteContent
  }

  const parsed = siteContentSchema.safeParse(data.content)
  return parsed.success ? parsed.data : defaultSiteContent
})

export async function saveSiteContent(content: SiteContent) {
  const supabase = await createClient()
  const parsed = siteContentSchema.parse(content)

  const { error } = await supabase.from("site_content").upsert(
    {
      id: SITE_CONTENT_ROW_ID,
      content: parsed,
    },
    { onConflict: "id" },
  )

  if (error) {
    throw new Error(error.message)
  }

  return parsed
}
