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
    "cerrajero"
  ],
  openGraph: {
    title: "Cerrajería Flejes",
    description: "Apertura de casas y autos, duplicado de llaves y más.",
    locale: "es_ES",
    type: "website",
    url: "https://cerrajeria-flejes.com",
    siteName: "Cerrajería Flejes"
  },
  alternates: {
    canonical: "https://cerrajeria-flejes.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
