import type { Metadata } from "next"
import { ContactContent } from "@/components/contact-content"

export const metadata: Metadata = {
  title: "Contact",
  description: "Inquiries, exhibitions and acquisition requests for Anastasia Evdokimova.",
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ artwork?: string }>
}) {
  const { artwork } = await searchParams
  return <ContactContent key={artwork ?? ""} initialArtwork={artwork} />
}
