import NavBar from '@/components/NavBar/NavBar';
import React from 'react';
import styles from './styles.module.css';
import AccountSection from '@/components/AccountSection/AccountSection';
import CustomForm from './ProductForm';

{
  /*const routes = [
  {
    name: 'Artistas',
    path: '/dashboard/artist',
    icon: '/images/iconsSelect/artists.png',
    text: 'Red',
  },
  {
    name: 'Citas',
    path: '/dashboard/appointments',
    icon: '/images/iconsNSelect/appointments.png',
    text: 'None',
  },
  {
    name: 'Calendario',
    path: '/dashboard/calendar',
    icon: '/images/iconsNSelect/calendar.png',
    text: 'None',
  },
  {
    name: 'Productos',
    path: '/',
    icon: '/images/iconsNSelect/products.png',
    text: 'None',
  },
  {
    name: 'Reportes',
    path: '/',
    icon: '/images/iconsNSelect/reports.png',
    text: 'None',
  },
];*/
}

const Artists: React.FC = () => {
  return (
    <div className={styles.allArtist}>
      {/*<NavBar routes={routes} />*/}

      <AccountSection
        notificationCount={2}
        photoUrl="https://th.bing.com/th/id/OIP.hFh4Uw00oR7qfvoCqnG8fQHaEK?w=186&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7"
      />
      <div className={styles.calendarArtist}>
        <div className={styles.title}>Artista</div>
        <CustomForm></CustomForm>
      </div>
    </div>
  );
};

export default Artists;
