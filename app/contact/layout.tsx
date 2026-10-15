import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Beclassic Photography",
  description:
    "Get in touch with Beclassic Photography. Check wedding date availability, visit our studio in Grace Plaza Atlas, or call us at 093 251 2720 / +251 91 234 5678.",
  keywords: [
    "contact wedding photographer",
    "Beclassic Photography contact",
    "wedding photographer Addis Ababa",
    "Grace Plaza Atlas photography studio",
    "book wedding session",
  ],
  openGraph: {
    title: "Contact Us | Beclassic Photography",
    description:
      "We'd love to hear about your wedding plans. Check availability for your special day.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
