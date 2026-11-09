"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"
import { artworks } from "@/lib/artworks"
import { ArrowLink, Reveal } from "../primitives"

const selection = ["regression", "dream-pulse", "evanesense", "the-eternal-passage", "entropy", "whispers-of-eternity"].map(
  (slug) => artworks.find((a) => a.slug === slug)!,
)

export function WorksStrip() {
  const { t, locale } = useLanguage()
  return (
    <section aria-labelledby="works-strip-title" className="border-t border-border">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 id="works-strip-title" className="font-serif text-5xl font-light md:text-6xl">
            {t.works}
          </h2>
          <ArrowLink href="/works" className="hidden sm:inline-flex">
            {t.viewAllWorks}
          </ArrowLink>
        </div>
        <ul className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-6">
          {selection.map((art, i) => (
            <Reveal as="li" key={art.slug} delay={i * 90} className="w-[62vw] shrink-0 snap-start md:w-auto">
              <Link href={`/works/${art.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-card">
                  <Image
                    src={art.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 768px) 30vw, 62vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-background/0 transition-colors duration-700 group-hover:bg-background/15" />
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <span className="font-serif text-xl font-light leading-tight transition-colors group-hover:text-accent">
                    {art.title[locale]}
                  </span>
                  <span className="eyebrow text-muted-foreground">{art.year}</span>
                  <span aria-hidden className="mt-2 block h-px w-5 bg-foreground/40 transition-all duration-500 group-hover:w-10 group-hover:bg-accent" />
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
        <ArrowLink href="/works" className="mt-8 sm:hidden">
          {t.viewAllWorks}
        </ArrowLink>
      </div>
    </section>
  )
}
