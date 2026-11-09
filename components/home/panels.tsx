"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"
import { exhibitions, getArtwork } from "@/lib/artworks"
import { ArrowLink, Reveal, Rule } from "../primitives"

export function HomePanels() {
  const { t, locale } = useLanguage()
  const featured = getArtwork("dream-pulse")!

  return (
    <section aria-label="Highlights" className="border-t border-border">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.25fr_1fr_1fr]">
        <Reveal className="grid gap-8 border-b border-border px-6 py-14 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:px-12 lg:border-b-0 lg:border-r">
          <div className="flex flex-col gap-5">
            <span className="eyebrow text-muted-foreground">{t.featured}</span>
            <h2 className="font-serif text-4xl font-light uppercase leading-[0.95] md:text-5xl">
              {featured.title[locale]}
            </h2>
            <span className="font-serif text-lg">{featured.year}</span>
            <Rule className="w-6" />
            <p className="text-sm leading-relaxed text-muted-foreground">{featured.description?.[locale]}</p>
            <ArrowLink href={`/contact?artwork=${featured.slug}`} className="mt-auto">
              {t.inquire}
            </ArrowLink>
          </div>
          <Link href={`/works/${featured.slug}`} className="group relative block aspect-[4/5] overflow-hidden">
            <Image
              src={featured.image.src}
              alt={featured.title[locale]}
              fill
              sizes="(min-width: 1024px) 22vw, 50vw"
              className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
          </Link>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-8 border-b border-border px-6 py-14 md:px-12 lg:border-b-0 lg:border-r">
          <h2 className="font-serif text-4xl font-light md:text-5xl">{t.about.title}</h2>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/works/artist-studio.jpg"
                alt={t.about.portraitAlt}
                fill
                sizes="(min-width: 1024px) 14vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
              <p className="text-foreground/90">{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <ArrowLink href="/about" className="mt-auto">
                {t.readMore}
              </ArrowLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={240} className="flex flex-col gap-8 px-6 py-14 md:px-12">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-4xl font-light md:text-5xl">{t.exhibitions.title}</h2>
            <ArrowLink href="/exhibitions">{t.viewAll}</ArrowLink>
          </div>
          <ol className="relative flex flex-col border-l border-border">
            {exhibitions.map((ex) => (
              <li key={`${ex.year}-${ex.location.en}`} className="grid grid-cols-[4rem_1fr] gap-4 py-3 pl-5">
                <span className="font-serif text-lg tabular-nums">{ex.year}</span>
                <span className="text-sm leading-snug">
                  <span className="block">{ex.title[locale]}</span>
                  <span className="text-muted-foreground">{ex.location[locale]}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
