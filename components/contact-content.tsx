
"use client"

import Image from "next/image"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import { artworks, getArtwork, site } from "@/lib/artworks"
import { ArrowIcon, ArrowLink, PageHeading, Reveal } from "./primitives"

type Errors = Partial<Record<"name" | "email" | "message", string>>

const subjects = ["acquisition", "exhibition", "commission", "other"] as const

export function ContactContent() {
  const { t, locale } = useLanguage()
  const searchParams = useSearchParams()
  const initialArtwork = searchParams.get("artwork") ?? ""

  const preset =
    initialArtwork && getArtwork(initialArtwork) ? initialArtwork : ""

  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const visual = getArtwork("vision-beyond-time")!

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()
    const subject = String(data.get("subject") ?? "other") as (typeof subjects)[number]
    const artworkSlug = String(data.get("artwork") ?? "")

    const next: Errors = {}

    if (name.length < 2) next.name = t.contact.errors.name

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      next.email = t.contact.errors.email
    }

    if (message.length < 10) {
      next.message = t.contact.errors.message
    }

    setErrors(next)

    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      e.currentTarget
        .querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus()
      return
    }

    const artwork = artworkSlug ? getArtwork(artworkSlug) : undefined

    const subjectLine = `${t.contact.subjects[subject]}${
      artwork ? ` — ${artwork.title.en} (${artwork.year})` : ""
    }`

    const body = `${message}\n\n— ${name}\n${email}`

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(body)}`

    setSent(true)
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 md:pt-40">
      <PageHeading
        index="Dubai, UAE"
        title={t.contact.title}
        intro={t.contact.intro}
      />

      <div className="grid gap-16 py-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,3fr)] lg:gap-16 lg:py-20">
        <Reveal className="flex flex-col gap-10">
          <dl className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <dt className="eyebrow text-muted-foreground">
                {t.contact.email}
              </dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all font-serif text-2xl font-light transition-colors hover:text-accent md:text-3xl"
                >
                  {site.email}
                </a>
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="eyebrow text-muted-foreground">
                {t.contact.phone}
              </dt>
              <dd>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="font-serif text-2xl font-light transition-colors hover:text-accent"
                >
                  {site.phone}
                </a>
              </dd>
            </div>

            <div className="flex flex-col gap-2">
              <dt className="eyebrow text-muted-foreground">
                {t.contact.location}
              </dt>
              <dd className="font-serif text-2xl font-light">
                {t.contact.locationValue}
              </dd>
            </div>
          </dl>

          {site.instagram && (
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow group inline-flex items-center gap-4 transition-colors hover:text-accent"
            >
              {t.contact.instagram}
              <ArrowIcon className="text-accent transition-transform duration-500 group-hover:translate-x-1.5" />
            </a>
          )}
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mb-8 font-serif text-3xl font-light">
            {t.contact.formTitle}
          </h2>

          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-7"
          >
            <div className="grid gap-7 sm:grid-cols-2">
              <Field
                label={t.contact.name}
                name="name"
                error={errors.name}
                autoComplete="name"
              />

              <Field
                label={t.contact.emailField}
                name="email"
                type="email"
                error={errors.email}
                autoComplete="email"
              />
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <SelectField
                label={t.contact.subject}
                name="subject"
                defaultValue="acquisition"
              >
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {t.contact.subjects[s]}
                  </option>
                ))}
              </SelectField>

              <SelectField
                label={t.contact.artwork}
                name="artwork"
                defaultValue={preset}
              >
                <option value="">—</option>

                {artworks.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.title[locale]}, {a.year}
                  </option>
                ))}
              </SelectField>
            </div>

            <Field
              label={t.contact.message}
              name="message"
              multiline
              error={errors.message}
            />

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="eyebrow group inline-flex w-fit items-center gap-5 border border-foreground/60 px-7 py-4 transition-colors hover:border-accent hover:bg-accent"
              >
                {t.contact.send}
                <ArrowIcon className="transition-transform duration-500 group-hover:translate-x-1.5" />
              </button>

              <p
                role="status"
                className={cn(
                  "text-sm text-muted-foreground",
                  !sent && "sr-only"
                )}
              >
                {sent ? t.contact.sent : ""}
              </p>
            </div>
          </form>
        </Reveal>

        <Reveal delay={200} className="hidden lg:block">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={visual.image.src}
              alt={`${visual.title[locale]}, ${visual.year}`}
              fill
              sizes="25vw"
              className="object-cover object-[70%_30%]"
            />
          </div>

          <ArrowLink href={`/works/${visual.slug}`} className="mt-4">
            {visual.title[locale]}
          </ArrowLink>
        </Reveal>
      </div>
    </div>
  )
}

const inputClass =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent aria-[invalid=true]:border-destructive"

function Field({
  label,
  name,
  type = "text",
  error,
  multiline,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  error?: string
  multiline?: boolean
  autoComplete?: string
}) {
  const id = `field-${name}`
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="eyebrow text-muted-foreground">
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(inputClass, "resize-none")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={inputClass}
        />
      )}

      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function SelectField({
  label,
  name,
  defaultValue,
  children,
}: {
  label: string
  name: string
  defaultValue?: string
  children: React.ReactNode
}) {
  const id = `field-${name}`

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="eyebrow text-muted-foreground">
        {label}
      </label>

      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={cn(inputClass, "cursor-pointer [&>option]:bg-card")}
      >
        {children}
      </select>
    </div>
  )
}
