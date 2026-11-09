"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import type { Locale } from "@/lib/artworks"

const options: { value: Locale; label: string; name: string }[] = [
  { value: "en", label: "EN", name: "English" },
  { value: "ru", label: "RU", name: "Русский" },
]

export function LanguageSwitch() {
  const { locale, setLocale } = useLanguage()
  return (
    <div role="group" aria-label="Language" className="eyebrow flex items-center gap-3">
      {options.map((opt, i) => (
        <span key={opt.value} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="h-3 w-px bg-border" />}
          <button
            type="button"
            lang={opt.value}
            aria-label={opt.name}
            aria-pressed={locale === opt.value}
            onClick={() => setLocale(opt.value)}
            className={cn(
              "transition-colors",
              locale === opt.value ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.label}
          </button>
        </span>
      ))}
    </div>
  )
}
