import NavBar from '@/components/NavBar/NavBar';
import React from 'react';
import styles from './styles.module.css';
import AccountSection from '@/components/AccountSection/AccountSection';
import ComCalendar from '@/components/ComCalendar/ComCalendar';

const routes = [
  {
    name: 'Artistas',
    path: '/dashboard/artist',
    icon: '/images/iconsNSelect/artists.png',
    text: 'None',
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
    icon: '/images/iconsSelect/calendar.png',
    text: 'Red',
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
];

const Calendar: React.FC = () => {
  return (
    <div className={styles.allCalendar}>
      <NavBar routes={routes} />
      <AccountSection
        notificationCount={2}
        photoUrl="https://th.bing.com/th/id/OIP.hFh4Uw00oR7qfvoCqnG8fQHaEK?w=186&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7"
      />
      <div className={styles.calendarContent}>
        <div className={styles.title}>Calendario</div>
        <ComCalendar />
      </div>
    </div>
  );
};

export default Calendar;
