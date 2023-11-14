'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import styles from './styles.module.css';
import './SalesMonth.css';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ComReports: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const series = [
    {
      name: 'Ventas',
      data: [500, 800, 600],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'area',
    },
    xaxis: {
      categories: ['Enero', 'Febrero', 'Marzo'],
    },
    yaxis: {
      title: {
        text: 'Ventas',
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `${val}`,
      },
      theme: 'dark',
    },
  };

  return (
    <div className={styles.report}>
      <div className={styles.title}>Ventas por mes</div>
      {isClient && <Chart options={options} series={series} type="area" />}
    </div>
  );
};

export default ComReports;
