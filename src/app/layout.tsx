import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from "@/components/NavBar/NavBar";
import Providers from './helpers/Providers';

export const metadata: Metadata = {
  title: 'SacrisApp',
  description: 'Aplicación SacrisApp',
  icons: '/images/Logo.png',
}

export default function PrincipalLayout({children }: PageProps) {


const routes = [
  {
      name: 'Artistas',
      path: '/admin/dashboard/artist',
      icon: '/images/iconsNSelect/artists.png',
      text: 'None'
  },
  {
      name: 'Calendario',
      path: '/admin/dashboard/calendar',
      icon: '/images/iconsNSelect/calendar.png',
      text: 'None'
  },
  {
      name: 'Productos',
      path: '/',
      icon: '/images/iconsNSelect/products.png',
      text: 'None'
  },
  {
      name: 'Reportes',
      path: '/',
      icon: '/images/iconsNSelect/reports.png',
      text: 'None'
  },
]

  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar routes={routes}/>
          {children}
        </Providers>
        </body>
    </html>
  );
}


interface PageProps {
  children: React.ReactNode;
}