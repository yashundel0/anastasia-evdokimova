import type { Metadata } from "next"
import { AboutContent } from "@/components/about-content"

export const metadata: Metadata = {
  title: "About",
  description: "Biography and artistic philosophy of contemporary artist Anastasia Evdokimova.",
}

export default function AboutPage() {
  return <AboutContent />
}
