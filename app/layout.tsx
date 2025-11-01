import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Personal Agent',
  description: 'Manage Notion, Google Calendar, and Gmail with AI',
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
