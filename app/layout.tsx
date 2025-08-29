import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LandVest - UK\'s First AI-Powered Land Investment Platform',
  description: 'Discover profitable land opportunities in Birmingham with planning permission intelligence, comprehensive data analysis, and investment-focused tools.',
  keywords: 'land investment, Birmingham property, UK land, planning permission, property investment',
  openGraph: {
    title: 'LandVest - AI-Powered Land Investment',
    description: 'The UK\'s first dedicated platform for land investors',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}