import type { Metadata } from "next"
import { Suspense } from "react"
import { ContactContent } from "@/components/contact-content"

export const metadata: Metadata = {
  title: "Contact",
  description: "Inquiries, exhibitions and acquisition requests for Anastasia Evdokimova.",
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading contact form...</div>}>
      <ContactContent />
    </Suspense>
  )
}
