'use client';
import React from 'react';
import styles from './styles.module.css';
import { useSession } from 'next-auth/react';

interface AccountSectionProps {
  notificationCount: number;
  photoUrl: string;
}

const AccountSection: React.FC<AccountSectionProps> = ({
  notificationCount,
  photoUrl,
}) => {
  const { data: session } = useSession();

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
