"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n"
import { site } from "@/lib/artworks"

export function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-14 md:grid-cols-3 md:items-end md:px-12">
        <div className="flex flex-col gap-3">
          <p className="font-serif text-3xl font-light leading-none">Anastasia Evdokimova</p>
          <p className="eyebrow text-muted-foreground">{t.role}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground md:items-center">
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-foreground">
            {site.email}
          </a>
          <span>{t.about.based}</span>
        </div>
        <div className="flex items-center justify-between gap-6 md:justify-end">
          <p className="text-xs text-muted-foreground">
            {"© "}
            {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <Link href="#main" className="eyebrow text-muted-foreground transition-colors hover:text-foreground">
            {t.footer.backTop}
          </Link>
        </div>
      </div>
    </footer>
  )
}
