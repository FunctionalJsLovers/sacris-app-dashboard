import React from 'react';
import styles from './styles.module.css';
import AccountSection from '@/components/AccountSection/AccountSection';
import ComCalendar from '@/components/ComCalendar/ComCalendar';

const Calendar: React.FC = () => {
  return (
    <div className={styles.allCalendar}>
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
