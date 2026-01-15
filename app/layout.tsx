import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Classic Models Analytics Dashboard',
  description: 'Comprehensive analysis of naming conventions and textual patterns in Classic Models database',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
