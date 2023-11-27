import React from 'react';
import styles from './styles.module.css';
import Home from '@/components/Home/Home';
import AccountSection from '@/components/AccountSection/AccountSection';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.allDashboard}>
      <AccountSection photoUrl="https://th.bing.com/th/id/OIP.hFh4Uw00oR7qfvoCqnG8fQHaEK?w=186&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <div className={styles.content}>
        <Home />
      </div>
    </div>
  );
};

export default Dashboard;
