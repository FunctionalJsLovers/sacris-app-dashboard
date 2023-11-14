import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import MonthAppointments from '@/components/ComReports/Reports/MonthAppointments/MonthAppointments';
import SalesMonth from '@/components/ComReports/Reports/SalesForMonth/SalesMonth';

const ComReports: React.FC = () => {
  return (
    <div className={styles.allReports}>
      <div className={styles.report}>
        <MonthAppointments />
      </div>
      <div className={styles.report}>
        <SalesMonth />
      </div>
    </div>
  );
};

export default ComReports;
