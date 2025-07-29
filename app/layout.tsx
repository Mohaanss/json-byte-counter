import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Compteur de Bytes JSON - Analyseur de Taille de Payload JSON Gratuit",
  description:
    "Outil gratuit pour analyser la taille de vos payloads JSON en bytes. Comptez les caractères, validez la syntaxe JSON et optimisez vos APIs. Calcul en temps réel UTF-8.",
  keywords: [
    "compteur bytes JSON",
    "analyseur JSON",
    "taille payload JSON",
    "validateur JSON",
    "outil développeur",
    "API JSON",
    "UTF-8 bytes",
    "optimisation JSON",
    "calculateur taille JSON",
  ],
  authors: [{ name: "JSON Byte Counter" }],
  creator: "JSON Byte Counter",
  publisher: "JSON Byte Counter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://votre-domaine.com",
    title: "Compteur de Bytes JSON - Analyseur de Taille de Payload JSON",
    description:
      "Outil gratuit pour analyser la taille de vos payloads JSON en bytes. Validation JSON et statistiques en temps réel.",
    siteName: "JSON Byte Counter",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Compteur de Bytes JSON - Outil d'analyse de payload JSON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compteur de Bytes JSON - Analyseur de Payload JSON",
    description: "Analysez la taille de vos payloads JSON en bytes. Outil gratuit avec validation et statistiques.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://votre-domaine.com",
  },
  verification: {
    google: "votre-code-google-search-console",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={inter.className}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Compteur de Bytes JSON",
              description:
                "Outil gratuit pour analyser la taille de vos payloads JSON en bytes avec validation et statistiques en temps réel.",
              url: "https://votre-domaine.com",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
              featureList: [
                "Comptage de bytes en temps réel",
                "Validation JSON",
                "Statistiques détaillées",
                "Formatage JSON",
                "Calcul UTF-8",
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
