import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | BeclassicPhotography",
  description:
    "Get in touch with BeclassicPhotography. Check availability for your wedding day, request custom quotes, or visit our studio in Addis Ababa.",
  keywords: [
    "contact wedding photographer",
    "BeclassicPhotography contact",
    "wedding photography Addis Ababa",
    "Ethiopian wedding photographer",
    "Beclassic Photography Ethiopia",
  ],
  openGraph: {
    title: "Contact Us | BeclassicPhotography",
    description:
      "Check availability for your special wedding day. We'd love to hear about your wedding plans.",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
