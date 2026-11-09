"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import type { ArtworkImage } from "@/lib/artworks"

export function Lightbox({
  image,
  alt,
  onClose,
  closeLabel,
}: {
  image: ArtworkImage | null
  alt: string
  onClose: () => void
  closeLabel: string
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (image && !dialog.open) dialog.showModal()
    if (!image && dialog.open) dialog.close()
  }, [image])

  return (
    <dialog
      ref={dialogRef}
      aria-label={alt}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-background/95 p-0 text-foreground backdrop:bg-background/80 backdrop:backdrop-blur-sm open:animate-in open:fade-in-0"
    >
      {image && (
        <div className="flex h-full w-full items-center justify-center p-4 md:p-12" onClick={onClose}>
          <Image
            src={image.src}
            alt={alt}
            width={image.width}
            height={image.height}
            sizes="100vw"
            quality={95}
            className="h-auto max-h-full w-auto max-w-full object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <button
        type="button"
        onClick={onClose}
        className="eyebrow absolute right-5 top-5 flex items-center gap-3 text-foreground transition-colors hover:text-accent md:right-10 md:top-8"
      >
        {closeLabel}
        <X className="h-4 w-4" strokeWidth={1} aria-hidden />
      </button>
    </dialog>
  )
}
