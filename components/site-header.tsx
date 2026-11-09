"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import { LanguageSwitch } from "./language-switch"

const links = [
  { href: "/works", key: "works" },
  { href: "/exhibitions", key: "exhibitions" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const

export function SiteHeader() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-12">
        <Link
          href="/"
          className="font-sans text-[0.72rem] uppercase tracking-[0.3em] text-foreground transition-opacity hover:opacity-70 md:text-xs"
        >
          Anastasia Evdokimova
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {links.map((link) => {
              const active = pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "eyebrow group relative py-2 transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t.nav[link.key]}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-500",
                        active ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden md:block">
          <LanguageSwitch />
        </div>

        <button
          type="button"
          className="eyebrow flex items-center gap-3 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.close : t.menu}
          <span aria-hidden className="relative block h-2.5 w-6">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-full bg-foreground transition-transform duration-300",
                open && "translate-y-[5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-px w-full bg-foreground transition-transform duration-300",
                open && "-translate-y-[4px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 bg-background transition-opacity duration-500 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="flex h-full flex-col justify-between px-6 pb-10 pt-12">
          <ul className="flex flex-col gap-6">
            {links.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline gap-4 font-serif text-5xl font-light"
                >
                  <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  )
}
