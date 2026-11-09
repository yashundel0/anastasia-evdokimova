"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "section" | "li" | "article"
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible")
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      // @ts-expect-error polymorphic ref across element types
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}

export function ArrowIcon({ className, direction = "right" }: { className?: string; direction?: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 28 10"
      fill="none"
      className={cn("h-2.5 w-7", direction === "left" && "rotate-180", className)}
    >
      <path d="M0 5h27M22 0.5 27 5l-5 4.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "eyebrow group inline-flex items-center gap-4 text-foreground transition-colors hover:text-accent",
        className,
      )}
    >
      {children}
      <ArrowIcon className="text-accent transition-transform duration-500 group-hover:translate-x-1.5" />
    </Link>
  )
}

export function Rule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-px w-10 bg-foreground/70", className)} />
}

export function PageHeading({
  index,
  title,
  intro,
  children,
}: {
  index: string
  title: string
  intro?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-8 border-b border-border pb-10 md:flex-row md:items-end md:justify-between md:pb-14">
      <div className="flex flex-col gap-5">
        <span className="eyebrow text-muted-foreground">{index}</span>
        <h1 className="text-balance font-serif text-6xl font-light leading-[0.95] md:text-8xl">{title}</h1>
        {intro && <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
      {children}
    </div>
  )
}
