import React from 'react';
import styles from './styles.module.css';
import AccountSection from '@/components/AccountSection/AccountSection';
import ComCalendar from '@/components/ComCalendar/ComCalendar';
import ComReports from '@/components/ComReports/ComReports';

const Reports: React.FC = () => {
  return (
    <div className={styles.allReports}>
      <AccountSection
        notificationCount={2}
        photoUrl="https://th.bing.com/th/id/OIP.hFh4Uw00oR7qfvoCqnG8fQHaEK?w=186&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7"
      />
      <div className={styles.reportsContent}>
        <div className={styles.title}>Reportes</div>
        <ComReports />
      </div>
    </div>
  );
};

export default Reports;
