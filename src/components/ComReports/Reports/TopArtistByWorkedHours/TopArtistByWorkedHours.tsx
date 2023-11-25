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

const TopArtistByWorkedHours: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    setIsClient(true);
    fetch(`${apiBaseUrl}/admin/topArtistByWorkedHours`)
      .then((response) => response.json())
      .then((data: { artist: ArtistSessionData }) => {
        const seriesData = Object.entries(data.artist).map(([name, value]) => ({
          name,
          data: value,
        }));

        setChartData(seriesData);
      })
      .catch((error) => console.error('Error obteniendo las horas:', error));
  }, []);

  const options: ApexOptions = {
    series: [
      {
        name: 'Horas',
        data: chartData.map((item) => item.data),
      },
    ],
    dataLabels: {
      enabled: true,
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
        horizontal: false,
        columnWidth: '70%',
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
      height: 350,
    },
    xaxis: {
      title: {
        text: 'Artistas',
        style: {
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
        },
      },
      categories: chartData.map((item) => item.name),
    },
    yaxis: [
      {
        title: {
          text: 'Horas',
          style: {
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
          },
        },
      },
    ],
    tooltip: {
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      },
      theme: 'dark',
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className={styles.report}>
      <div className={styles.title}>Horas trabajadas (Últimos 30 días)</div>
      {isClient && (
        <Chart options={options} series={options.series} type="bar" />
      )}
    </div>
  );
};

export default TopArtistByWorkedHours;
