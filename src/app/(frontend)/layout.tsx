import React from 'react'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Harrisonburg Common Ground',
  description: 'Harrisonburg Common Ground - Building community through dialogue',
  openGraph: {
    title: 'Harrisonburg Common Ground',
    description: 'Harrisonburg Common Ground - Building community through dialogue',
    siteName: 'Harrisonburg Common Ground',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Harrisonburg Common Ground',
    description: 'Harrisonburg Common Ground - Building community through dialogue',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
