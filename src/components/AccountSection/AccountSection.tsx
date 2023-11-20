'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useSession } from 'next-auth/react';
import { format, isToday } from 'date-fns';

interface AccountSectionProps {
  photoUrl: string;
}

interface Session {
  id: string;
  date: string;
  estimated_time: number;
  status: string;
  price: number;
  appointment_id: string;
}

const AccountSection: React.FC<AccountSectionProps> = ({ photoUrl }) => {
  const { data: session } = useSession();
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [notificationCount, setNotificationCount] = useState(0);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/admin/sessions`);
      const data = await response.json();

      const todayDate = format(new Date(), 'yyyy-MM-dd');

      const todaySessions = data.sessions.filter((session: Session) =>
        isToday(new Date(session.date)),
      );

      setNotificationCount(todaySessions.length);
    } catch (error) {
      console.error('Error al obtener sesiones:', error);
    }
  };

  useEffect(() => {
    fetchSessions();
    const intervalId = setInterval(fetchSessions, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.accountSection}>
      <div className={styles.notificationIcon}>
        <span>{notificationCount}</span>
        <img
          className={styles.iconN}
          src="https://cdn.icon-icons.com/icons2/494/PNG/512/alarm_icon-icons.com_48364.png"
          alt="Notificaciones"
        />
      </div>
      <div className={styles.userInfo}>
        <span>{session?.user?.name}</span>
        <img src={photoUrl} alt={`Foto de ${session?.user?.name}`} />
      </div>
    </div>
  );
};

export default AccountSection;
