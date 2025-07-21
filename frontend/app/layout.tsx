// app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import ClientProviders from '@/lib/ClientProviders'
import './globals.css'

/* ----- fonts -------------------------------------------------- */
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/* ----- SEO / metadata ---------------------------------------- */
export const metadata: Metadata = {
  title: 'Llama Dashboard',
  description: 'Operational & cognitive telemetry for Llama-AI',
}

/* ----- root layout ------------------------------------------- */
export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/*
          This Server Component can export `metadata`.
          Inside it we render only a client boundary:
        */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
