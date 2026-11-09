import type { Metadata } from "next"
import { WorksGallery } from "@/components/works/works-gallery"

export const metadata: Metadata = {
  title: "Works",
  description: "Original paintings and works on paper by Anastasia Evdokimova.",
}

export default function WorksPage() {
  return <WorksGallery />
}
