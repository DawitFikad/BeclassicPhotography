import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { SiteContentProvider } from "@/components/providers/SiteContentProvider";
import { WebsiteBackground } from "@/components/layout/WebsiteBackground";

export const metadata: Metadata = {
  title: "Classic Photography Capturing Elegant Love Stories",
  description:
    "Beclassic Photography captures your special moments with elegant sophistication. We believe in creating timeless memories that will be cherished for generations to come.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "Beclassic Photography",
    "BeclassicPhotography",
    "wedding photography",
    "wedding videography",
    "Ethiopian wedding photography",
    "Addis Ababa photographer",
    "ceremony photo and video",
    "studio and landscape",
  ],
  openGraph: {
    title: "Classic Photography Capturing Elegant Love Stories",
    description:
      "Capturing your special moments with elegant sophistication. Timeless memories cherished for generations to come.",
    type: "website",
  },
};

const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem('beclassic-theme') || localStorage.getItem('plus-studio-theme');
    if (!t) {
      t = 'light';
    }
    document.documentElement.classList.add(t);
    document.documentElement.classList.remove(t === 'dark' ? 'light' : 'dark');
  } catch(e) {
    document.documentElement.classList.add('light');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-ink-950 text-ink-50 antialiased relative">
        <ThemeProvider>
          <LanguageProvider>
            <SiteContentProvider>
              <WebsiteBackground />
              <Navbar />
              <main className="min-h-screen relative z-10">{children}</main>
              <Footer />
              <FloatingButtons />
            </SiteContentProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
