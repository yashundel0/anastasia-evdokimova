import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArtworkDetail } from "@/components/works/artwork-detail"
import { artworks, getArtwork } from "@/lib/artworks"

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const art = getArtwork(slug)
  if (!art) return {}
  return {
    title: `${art.title.en}, ${art.year}`,
    description: art.description?.en ?? `${art.title.en} (${art.year}) by Anastasia Evdokimova.`,
    openGraph: { images: [art.image.src] },
  }
}

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getArtwork(slug)) notFound()
  return (
    <div key={slug} className="page-enter">
      <ArtworkDetail slug={slug} />
    </div>
  )
}
