'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import styles from './styles.module.css';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const MonthAppointments: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const series = [
    {
      name: 'Citas',
      data: [23, 30, 34],
    },
  ];

  const options: ApexOptions = {
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#000000'],
      },
    },
    theme: {
      mode: 'light',
    },
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    colors: [
      '#33b2df',
      '#546E7A',
      '#d4526e',
      '#13d8aa',
      '#A5978B',
      '#2b908f',
      '#f9a3a4',
      '#90ee7e',
      '#f48024',
      '#69d2e7',
    ],
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: ['Enero', 'Febrero', 'Marzo'],
    },
    yaxis: {
      title: {
        text: 'Citas',
        style: {
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      },
      theme: 'dark',
    },
  };

  return (
    <div className={styles.report}>
      <div className={styles.title}>Citas por mes</div>
      {isClient && <Chart options={options} series={series} type="bar" />}
    </div>
  );
};

export default MonthAppointments;
