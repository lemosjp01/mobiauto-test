import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { FormProvider } from '@/contexts/FormContext'

const roboto = Roboto({ style: "normal", subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: 'Mobiauto Test',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <FormProvider>
          {children}
        </FormProvider>
      </body>
    </html>
  )
}
