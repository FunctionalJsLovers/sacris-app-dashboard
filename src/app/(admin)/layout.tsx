import NavBar from '@/components/NavBar/NavBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SacrisApp',
  description: 'Aplicación SacrisApp',
  icons: '/images/Logo.png',
};

export default function AdminLayout({ children }: PageProps) {
  const routes = [
    {
      name: 'Artistas',
      path: '/artist',
      icon: 'ri:account-circle-line',
      text: 'None',
    },
    {
      name: 'Citas',
      path: '/appointments',
      icon: 'ri:calendar-todo-fill',
      text: 'None',
    },
    {
      name: 'Calendario',
      path: '/calendar',
      icon: 'ri:calendar-2-line',
      text: 'None',
    },
    {
      name: 'Reportes',
      path: '/reports',
      icon: 'ri:bar-chart-box-line',
      text: 'None',
    },
    {
      name: 'Clientes',
      path: '/clients',
      icon: 'ri:user-shared-line',
      text: 'None',
    },
  ];

  return (
    <>
      <NavBar routes={routes} />
      {children}
    </>
  );
}

interface PageProps {
  children: React.ReactNode;
}
