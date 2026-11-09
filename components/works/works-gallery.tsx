"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import { artworks, type ArtworkCategory } from "@/lib/artworks"
import { ArrowIcon, PageHeading } from "../primitives"

type Filter = "all" | ArtworkCategory
const filters: Filter[] = ["all", "painting", "drawing"]

export function WorksGallery() {
  const { t, locale } = useLanguage()
  const [filter, setFilter] = useState<Filter>("all")
  const visible = filter === "all" ? artworks : artworks.filter((a) => a.category === filter)

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-40">
      <PageHeading index={t.worksCount(artworks.length)} title={t.works} intro={t.worksIntro}>
        <div role="group" aria-label="Filter works" className="flex gap-8">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "eyebrow relative pb-2 transition-colors",
                filter === f ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.filters[f]}
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-0 left-0 h-px bg-accent transition-all duration-500",
                  filter === f ? "w-full" : "w-0",
                )}
              />
            </button>
          ))}
        </div>
      </PageHeading>

      <p className="sr-only" aria-live="polite">
        {t.worksCount(visible.length)}
      </p>

      <ul key={filter} className="page-enter mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
        {visible.map((art, i) => (
          <li key={art.slug} className="mb-10 break-inside-avoid">
            <Link href={`/works/${art.slug}`} className="group block">
              <div className="relative overflow-hidden bg-card">
                <Image
                  src={art.image.src}
                  alt={art.title[locale]}
                  width={art.image.width}
                  height={art.image.height}
                  sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  priority={i < 4}
                  className="h-auto w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <span className="eyebrow flex items-center gap-3 text-foreground">
                    {String(artworks.indexOf(art) + 1).padStart(2, "0")}
                    <ArrowIcon className="text-accent" />
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4 border-b border-border pb-4">
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-xl font-light uppercase leading-tight tracking-wide transition-colors group-hover:text-accent">
                    {art.title[locale]}
                  </span>
                  <span className="text-xs text-muted-foreground">{t.category[art.category]}</span>
                </div>
                <span className="eyebrow pt-1 text-muted-foreground">{art.year}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
