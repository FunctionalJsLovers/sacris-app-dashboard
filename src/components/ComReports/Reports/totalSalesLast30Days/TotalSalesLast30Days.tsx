'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import styles from './styles.module.css';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ArtistSessionData {
  [key: string]: number;
}

interface ChartDataItem {
  name: string;
  data: number;
}

const TotalSalesLast30Days: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    setIsClient(true);
    fetch(`${apiBaseUrl}/admin/totalSalesLast30Days`)
      .then((response) => response.json())
      .then((data: { artist: ArtistSessionData }) => {
        const seriesData = Object.entries(data.artist).map(([name, value]) => ({
          name,
          data: value,
        }));

        setChartData(seriesData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const options: ApexOptions = {
    series: chartData.map((item) => item.data),
    labels: chartData.map((item) => item.name),
    theme: {
      mode: 'light',
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
      type: 'donut',
      height: 500,
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      },
      theme: 'dark',
      y: {
        formatter: function (value) {
          return formatNumberColombianStyle(value) + '$ pesos';
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
    },
  };

  return (
    <div className={styles.report}>
      <div className={styles.title}>Ingresos por artista (Mes)</div>
      {isClient && (
        <Chart options={options} series={options.series} type="donut" />
      )}
    </div>
  );
};

export default TotalSalesLast30Days;

function formatNumberColombianStyle(num: number) {
  return num.toLocaleString('es-CO', { style: 'decimal' });
}
