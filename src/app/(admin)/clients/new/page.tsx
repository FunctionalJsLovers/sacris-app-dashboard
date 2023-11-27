import NavBar from '@/components/NavBar/NavBar';
import React from 'react';
import styles from './styles.module.css';
import AccountSection from '@/components/AccountSection/AccountSection';
import CustomForm from '@/components/FormClient/ClientForm';

const Artists: React.FC = () => {
  return (
    <div className={styles.allArtist}>
      <AccountSection photoUrl="https://th.bing.com/th/id/OIP.hFh4Uw00oR7qfvoCqnG8fQHaEK?w=186&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <div className={styles.calendarArtist}>
        <div className={styles.title}>Clientes</div>
        <div className={styles.container}>
          <CustomForm></CustomForm>
        </div>
      </div>
    </div>
  );
};

export default Artists;
