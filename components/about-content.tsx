"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"
import { getArtwork } from "@/lib/artworks"
import { ArrowLink, PageHeading, Reveal, Rule } from "./primitives"

const heritage = ["khokhloma-dawn", "gzhel-blossom", "red-kerchief"].map((slug) => getArtwork(slug)!)

export function AboutContent() {
  const { t, locale } = useLanguage()
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-40">
      <PageHeading index="Anastasia Evdokimova" title={t.about.title} />

      <div className="grid gap-12 py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:py-20">
        <Reveal className="relative">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/works/artist-studio.jpg"
              alt={t.about.portraitAlt}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="eyebrow mt-4 text-muted-foreground">{t.about.based}</p>
        </Reveal>

        <div className="flex flex-col gap-14">
          <Reveal delay={100} className="flex flex-col gap-6">
            <p className="text-pretty font-serif text-3xl font-light leading-snug md:text-4xl">{t.about.p1}</p>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">{t.about.p2}</p>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">{t.about.p3}</p>
          </Reveal>

          <Reveal delay={150} className="grid gap-10 border-t border-border pt-10 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <span className="eyebrow text-accent">01</span>
              <h2 className="font-serif text-2xl">{t.about.philosophyTitle}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.about.philosophy}</p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="eyebrow text-accent">02</span>
              <h2 className="font-serif text-2xl">{t.about.backgroundTitle}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.about.background}</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <ul className="grid grid-cols-3 gap-4">
              {heritage.map((art) => (
                <li key={art.slug}>
                  <Link href={`/works/${art.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={art.image.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 18vw, 30vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                    <span className="mt-3 block font-serif text-base leading-tight transition-colors group-hover:text-accent md:text-lg">
                      {art.title[locale]}
                    </span>
                    <span className="eyebrow text-muted-foreground">{art.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="flex flex-wrap items-center gap-10">
            <Rule />
            <ArrowLink href="/works">{t.viewWorks}</ArrowLink>
            <ArrowLink href="/contact">{t.nav.contact}</ArrowLink>
          </div>
        </div>
      </div>
    </div>
  )
}
