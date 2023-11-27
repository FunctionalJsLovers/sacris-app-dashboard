import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import MonthAppointments from '@/components/ComReports/Reports/MonthAppointments/MonthAppointments';
import SalesMonth from '@/components/ComReports/Reports/SalesForMonth/SalesMonth';
import TopArtistBySessions from '@/components/ComReports/Reports/TopArtistBySessions/TopArtistBySessions';
import TotalSalesLast30Days from '@/components/ComReports/Reports/totalSalesLast30Days/TotalSalesLast30Days';
import TopArtistByWorkedHours from '@/components/ComReports/Reports/TopArtistByWorkedHours/TopArtistByWorkedHours';
import TopCategories from '@/components/ComReports/Reports/TopCategories/TopCategories';
import TopCategoriesMonth from '@/components/ComReports/Reports/TopCategoriesMonth/TopCategoriesMonth';
import ArtistSessions from '@/components/ComReports/Reports/ArtistSessions/ArtistSessions';
import ArtistHours from '@/components/ComReports/Reports/ArtistHours/ArtistHours';
import ArtistSales from '@/components/ComReports/Reports/ArtistSales/ArtistSales';

const ComReports: React.FC = () => {
  return (
    <div className={styles.allReports}>
      <div className={styles.report}>
        <MonthAppointments />
      </div>
      <div className={styles.report}>
        <SalesMonth />
      </div>
      <div className={styles.report}>
        <TopArtistBySessions />
      </div>
      <div className={styles.report}>
        <TopArtistByWorkedHours />
      </div>
      <div className={styles.report}>
        <TotalSalesLast30Days />
      </div>
      <div className={styles.report}>
        <TopCategoriesMonth />
      </div>
      <div className={styles.report}>
        <ArtistSessions />
      </div>
      <div className={styles.report}>
        <ArtistHours />
      </div>
      <div className={styles.report}>
        <ArtistSales />
      </div>
    </div>
  );
};

export default ComReports;
