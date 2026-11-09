"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import { getArtwork, getNeighbours, type ArtworkImage } from "@/lib/artworks"
import { ArrowIcon, ArrowLink, Rule } from "../primitives"
import { Lightbox } from "./lightbox"

export function ArtworkDetail({ slug }: { slug: string }) {
  const { t, locale } = useLanguage()
  const router = useRouter()
  const art = getArtwork(slug)!
  const { index, total, prev, next } = getNeighbours(slug)
  const images: (ArtworkImage & { caption?: string })[] = [
    art.image,
    ...(art.views ?? []).map((v) => ({ ...v, caption: v.caption[locale] })),
  ]
  const [selected, setSelected] = useState(0)
  const [lightbox, setLightbox] = useState<ArtworkImage | null>(null)
  const current = images[selected] ?? images[0]
  const title = art.title[locale]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox || (e.target as HTMLElement)?.closest("input, textarea")) return
      if (e.key === "ArrowLeft") router.push(`/works/${prev.slug}`)
      if (e.key === "ArrowRight") router.push(`/works/${next.slug}`)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightbox, prev.slug, next.slug, router])

  return (
    <article className="mx-auto max-w-[1440px] px-6 pb-20 pt-28 md:px-12 md:pt-32">
      <Link
        href="/works"
        className="eyebrow group mb-10 inline-flex items-center gap-4 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowIcon direction="left" className="text-accent transition-transform duration-500 group-hover:-translate-x-1.5" />
        {t.detail.back}
      </Link>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_auto] lg:gap-14">
        <div className="order-2 flex flex-col gap-7 lg:order-1 lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow tabular-nums text-muted-foreground">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-3">
            <h1 className="text-balance font-serif text-5xl font-light uppercase leading-[0.95] md:text-6xl">{title}</h1>
            <p className="font-serif text-2xl font-light">{art.year}</p>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <dt className="text-muted-foreground">{t.detail.category}</dt>
            <dd>{t.category[art.category]}</dd>
            <dt className="text-muted-foreground">{t.detail.dimensions}</dt>
            <dd>{art.dimensions ?? t.detail.onRequest}</dd>
          </dl>
          <Rule />
          {art.description && (
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-foreground/85">{art.description[locale]}</p>
          )}
          <div className="flex flex-col gap-3 border border-border p-5">
            <p className="text-xs leading-relaxed text-muted-foreground">{t.detail.inquireText}</p>
            <ArrowLink href={`/contact?artwork=${art.slug}`}>{t.detail.inquireAbout}</ArrowLink>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <button
            type="button"
            onClick={() => setLightbox(current)}
            className="group relative block w-full cursor-zoom-in"
            aria-label={`${t.detail.enlarge}: ${title}`}
          >
            <div className="flex max-h-[78vh] items-center justify-center bg-card/40">
              <Image
                key={current.src}
                src={current.src}
                alt={title}
                width={current.width}
                height={current.height}
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="page-enter h-auto max-h-[78vh] w-auto max-w-full object-contain shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
              />
            </div>
            <span className="eyebrow absolute bottom-4 right-4 flex items-center gap-2 bg-background/70 px-3 py-2 opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Maximize2 className="h-3.5 w-3.5" strokeWidth={1} aria-hidden />
              {t.detail.enlarge}
            </span>
          </button>
          {current.caption && <p className="mt-3 text-xs text-muted-foreground">{current.caption}</p>}
        </div>

        <div className="order-3 flex flex-row gap-4 lg:w-28 lg:flex-col">
          {images.length > 1 &&
            images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`${title} — ${i + 1}`}
                aria-pressed={selected === i}
                className={cn(
                  "relative aspect-square w-20 overflow-hidden border transition-opacity lg:w-full",
                  selected === i ? "border-accent" : "border-border opacity-60 hover:opacity-100",
                )}
              >
                <Image src={img.src} alt="" fill sizes="112px" className="object-cover" />
              </button>
            ))}
        </div>
      </div>

      <nav aria-label="Artwork navigation" className="mt-20 grid grid-cols-2 border-y border-border">
        <NeighbourLink href={`/works/${prev.slug}`} label={t.detail.prev} title={prev.title[locale]} year={prev.year} src={prev.image.src} direction="left" />
        <NeighbourLink href={`/works/${next.slug}`} label={t.detail.next} title={next.title[locale]} year={next.year} src={next.image.src} direction="right" />
      </nav>

      <Lightbox image={lightbox} alt={title} onClose={() => setLightbox(null)} closeLabel={t.close} />
    </article>
  )
}

function NeighbourLink({
  href,
  label,
  title,
  year,
  src,
  direction,
}: {
  href: string
  label: string
  title: string
  year: number
  src: string
  direction: "left" | "right"
}) {
  const isNext = direction === "right"
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-5 py-8 transition-colors hover:bg-card/40",
        isNext ? "flex-row-reverse border-l border-border pl-5 text-right md:pr-6" : "pr-5 md:pl-6",
      )}
    >
      <div className="relative hidden h-20 w-16 shrink-0 overflow-hidden sm:block">
        <Image src={src} alt="" fill sizes="64px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <span className={cn("eyebrow flex items-center gap-3 text-muted-foreground", isNext && "flex-row-reverse")}>
          <ArrowIcon direction={direction} className="text-accent" />
          {label}
        </span>
        <span className="truncate font-serif text-xl font-light uppercase md:text-2xl">{title}</span>
        <span className="text-xs text-muted-foreground">{year}</span>
      </div>
    </Link>
  )
}
