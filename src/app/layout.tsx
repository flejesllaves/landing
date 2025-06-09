import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cerrajería Flejes - Apertura de casas y autos, duplicado de llaves y más",
  description: "Cerrajería Flejes: especialistas en apertura de casas y autos, duplicado de llaves y tags, cambio y service de cerraduras, reparación de alza cristales. Servicio rápido y profesional.",
  keywords: [
    "cerrajería",
    "apertura de casas",
    "apertura de autos",
    "duplicado de llaves",
    "cambio de cerraduras",
    "service de cerraduras",
    "duplicado de tags",
    "reparación de alza cristales",
    "Flejes",
    "cerrajero",
    "cerrajeria 24hs",
    "cerrajero de autos",
    "cerrajeria autos"
  ],
  openGraph: {
    title: "Cerrajería Flejes",
    description: "Apertura de casas y autos, duplicado de llaves y más.",
    locale: "es_ES",
    type: "website",
    url: "https://landing-flejes-projects.vercel.app/",
    siteName: "Cerrajería Flejes"
  },
  alternates: {
    canonical: "https://landing-flejes-projects.vercel.app/"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="google-site-verification" content="fH4nYlgDgB8vnQ1ZL9-uLtgvzG-Pz9aPORK_PK41pTA" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "Locksmith",
          "name": "Cerrajería Flejes",
          "image": "https://landing-flejes-projects.vercel.app/flejes-logo.png",
          "@id": "https://landing-flejes-projects.vercel.app/",
          "url": "https://landing-flejes-projects.vercel.app/",
          "telephone": "+59894640180",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Montevideo",
            "addressCountry": "UY"
          },
          "description": "Cerrajería Flejes: apertura de casas y autos, duplicado de llaves y más."
        }`}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
