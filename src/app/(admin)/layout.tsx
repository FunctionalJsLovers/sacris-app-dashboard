import NavBar from '@/components/NavBar/NavBar'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'SacrisApp',
    description: 'Aplicación SacrisApp',
    icons: '/images/Logo.png'
  }

export default function AdminLayout({children}:PageProps){

    const routes = [
        {
          name: 'Artistas',
          path: '/dashboard/artist',
          icon: '/images/iconsNSelect/artists.png',
          text: 'None'
        },
        {
          name: 'Calendario',
          path: '/dashboard/calendar',
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
        }
      ]

    return(
        <>
            <NavBar routes={routes}/>
            {children}
        </>
    )
    
}

interface PageProps {
  children: React.ReactNode
}