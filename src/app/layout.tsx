/* eslint-disable react/react-in-jsx-scope */
import './globals.css'
import type { Metadata } from 'next'
import NavBar from '@/components/NavBar/NavBar'
import Providers from '@/helpers/Providers'

export const metadata: Metadata = {
  title: 'SacrisApp',
  description: 'Aplicación SacrisApp',
  icons: '/images/Logo.png'
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function PrincipalLayout ({ children }: PageProps) {


  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  )
}

interface PageProps {
  children: React.ReactNode
}
