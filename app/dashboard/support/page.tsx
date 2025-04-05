import ContactSupport from "@/components/contact-support"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Support - Moo Track Dashboard",
  description: "Get help and connect with our experts",
}

export default function SupportPage() {
  return <ContactSupport />
}

