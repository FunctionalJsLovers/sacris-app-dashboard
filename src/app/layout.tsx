import './globals.css';
import type { Metadata } from 'next';
import NavBar from '@/components/NavBar/NavBar';
import Providers from '@/helpers/Providers';

export const metadata: Metadata = {
  title: 'SacrisApp',
  description: 'Aplicación SacrisApp',
  icons: '/images/Logo.png',
};

export default function PrincipalLayout({ children }: PageProps) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

interface PageProps {
  children: React.ReactNode;
}
