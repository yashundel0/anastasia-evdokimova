"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/i18n"
import { exhibitions, getArtwork } from "@/lib/artworks"
import { PageHeading, Reveal } from "./primitives"

export function ExhibitionsContent() {
  const { t, locale } = useLanguage()
  const installation = getArtwork("whispers-of-eternity")!
  const groups = [
    { key: "solo", label: t.exhibitions.solo, items: exhibitions.filter((e) => e.type === "solo") },
    { key: "group", label: t.exhibitions.group, items: exhibitions.filter((e) => e.type === "group") },
  ]

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-40">
      <PageHeading index={t.exhibitions.timeline} title={t.exhibitions.title} intro={t.exhibitions.intro} />

      <div className="grid gap-16 py-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20 lg:py-20">
        <div className="flex flex-col gap-16">
          {groups.map((group) => (
            <section key={group.key} aria-labelledby={`ex-${group.key}`}>
              <h2 id={`ex-${group.key}`} className="eyebrow mb-6 text-accent">
                {group.label}
              </h2>
              <ol className="border-t border-border">
                {group.items.map((ex, i) => (
                  <Reveal
                    as="li"
                    key={`${ex.year}-${ex.location.en}`}
                    delay={i * 80}
                    className="group grid grid-cols-[5rem_1fr_auto] items-baseline gap-4 border-b border-border py-7 md:grid-cols-[8rem_1fr_auto]"
                  >
                    <span className="font-serif text-3xl font-light tabular-nums md:text-4xl">{ex.year}</span>
                    <span className="flex flex-col gap-1">
                      <span className="font-serif text-xl md:text-2xl">{ex.title[locale]}</span>
                      <span className="text-sm text-muted-foreground">{ex.location[locale]}</span>
                    </span>
                    <span className="eyebrow text-muted-foreground">
                      {ex.type === "solo" ? t.exhibitions.soloShort : t.exhibitions.groupShort}
                    </span>
                  </Reveal>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <Reveal delay={150} className="lg:sticky lg:top-32 lg:self-start">
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={installation.image.src}
                alt={`${installation.title[locale]}, ${installation.year}`}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 flex justify-between text-sm">
              <span className="font-serif text-lg">{installation.title[locale]}</span>
              <span className="eyebrow text-muted-foreground">{installation.year}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  )
}
