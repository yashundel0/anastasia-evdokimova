import type { Metadata } from "next"
import { ExhibitionsContent } from "@/components/exhibitions-content"

export const metadata: Metadata = {
  title: "Exhibitions",
  description: "Solo and group exhibitions of Anastasia Evdokimova.",
}

export default function ExhibitionsPage() {
  return <ExhibitionsContent />
}
