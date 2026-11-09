"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import { artworks, featuredSlugs } from "@/lib/artworks"
import { ArrowLink, Rule } from "../primitives"

const featured = featuredSlugs.map((slug) => artworks.find((a) => a.slug === slug)!)
const INTERVAL = 6500

export function Hero() {
  const { t, locale } = useLanguage()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setTimeout(() => setActive((i) => (i + 1) % featured.length), INTERVAL)
    return () => window.clearTimeout(id)
  }, [active, paused])

  const current = featured[active]

  return (
    <section
      aria-label="Introduction"
      className="relative mx-auto grid min-h-dvh max-w-[1440px] items-center gap-12 px-6 pb-16 pt-28 md:px-12 lg:grid-cols-[1fr_minmax(0,1.15fr)_auto] lg:gap-16 lg:pb-12 lg:pt-24"
    >
      <div className="relative z-10 flex flex-col gap-8">
        <div>
          <h1 className="font-serif text-[clamp(3.25rem,7vw,6.5rem)] font-light uppercase leading-[0.9] tracking-[0.01em]">
            <span className="block">Anastasia</span>
            <span className="block">Evdokimova</span>
          </h1>
          <p className="mt-5 font-sans text-xs font-light uppercase tracking-[0.5em] text-foreground/80 md:text-sm">
            {t.role}
          </p>
        </div>
        <Rule />
        <p className="font-serif text-2xl font-light italic leading-snug text-foreground/90">
          {t.statement.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <ArrowLink href="/works">{t.viewWorks}</ArrowLink>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          aria-hidden
          className="absolute -inset-10 -z-10 bg-[radial-gradient(closest-side,rgba(160,20,60,0.35),transparent)] blur-2xl"
        />
        <Link
          href={`/works/${current.slug}`}
          className="group relative block aspect-[4/5] w-full overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] lg:aspect-[5/6]"
          aria-label={`${current.title[locale]}, ${current.year}`}
        >
          {featured.map((art, i) => (
            <Image
              key={art.slug}
              src={art.image.src}
              alt={i === active ? art.title[locale] : ""}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className={cn(
                "object-cover transition-[opacity,transform] duration-[1600ms] ease-out group-hover:scale-[1.03]",
                i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
              )}
            />
          ))}
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-background/80 to-transparent p-5 pt-16">
            <span className="font-serif text-xl font-light">{current.title[locale]}</span>
            <span className="eyebrow text-foreground/70">{current.year}</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4 lg:flex-col lg:gap-5">
        <span className="eyebrow tabular-nums">{String(active + 1).padStart(2, "0")}</span>
        <div className="flex gap-2 lg:flex-col">
          {featured.map((art, i) => (
            <button
              key={art.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${art.title[locale]} (${i + 1}/${featured.length})`}
              aria-current={i === active}
              className="group flex h-6 w-6 items-center justify-center lg:h-6 lg:w-6"
            >
              <span
                className={cn(
                  "block bg-foreground transition-all duration-500",
                  "h-px lg:h-auto lg:w-px",
                  i === active ? "w-6 bg-accent lg:h-6" : "w-3 opacity-40 group-hover:opacity-80 lg:h-3",
                )}
              />
            </button>
          ))}
        </div>
        <span className="eyebrow tabular-nums text-muted-foreground">
          {String(featured.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  )
}
