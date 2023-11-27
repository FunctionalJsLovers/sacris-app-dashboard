'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Artist, ArtistSession } from '@/Types/types';
import styles from './styles.module.css';
import Error from '@/components/PopUps/Error/Error';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartDataItem {
  name: string;
  data: number;
}

const ArtistHours: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    undefined,
  );
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    setIsClient(true);
    const loadArtists = async () => {
      const artists = await fetch(`${apiBaseUrl}/admin/artists`)
        .then((response) => response.json())
        .then((data: { artists: Artist[] }) => data.artists);

      return artists;
    };

    const sumHoursByArtist = async (artist: Artist) => {
      const sessions = await fetch(
        `${apiBaseUrl}/admin/artists/${artist.id}/sessions`,
      )
        .then((response) => response.json())
        .then((data: { sessions: ArtistSession[] }) => data.sessions);

      return sessions
        .filter(
          (session) =>
            new Date(session.date).getFullYear() === selectedYear &&
            (selectedMonth
              ? new Date(session.date).getMonth() + 1 ===
                parseInt(selectedMonth, 10)
              : true),
        )
        .reduce((sum, session) => sum + session.estimated_time, 0);
    };

    const fetchData = async () => {
      const loadedArtists = await loadArtists();
      const hoursByArtistPromises = loadedArtists.map(async (artist) => ({
        name: `${artist.name}: ${await sumHoursByArtist(artist)}`,
        data: await sumHoursByArtist(artist),
      }));

      Promise.all(hoursByArtistPromises).then((hoursByArtist) => {
        setChartData(hoursByArtist);
        const hasData = hoursByArtist.some((item) => item.data !== 0);
        if (!hasData) {
          setError('No se encontró información en la fecha seleccionada.');
        }
      });
    };

    if (selectedYear !== null && selectedMonth !== undefined) {
      fetchData();
    }
  }, [selectedYear, selectedMonth]);

  const options: ApexOptions = {
    series: [
      {
        name: 'Horas este mes',
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
      categories: chartData.map((item) => item.name.split(':')[0]),
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

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    setSelectedYear(year);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = event.target.value;
    setSelectedMonth(month);
  };

  return (
    <div className={styles.report}>
      {error && <Error message={error} onClose={() => setError(null)} />}
      <div className={styles.title}>Horas por artista</div>
      <div className={styles.filters}>
        <div>
          <label htmlFor="yearSelect" className={styles.selectYear}>
            Seleccionar año:{' '}
          </label>
          <select
            id="yearSelect"
            defaultValue="Seleccionar.."
            onChange={handleYearChange}
            className={styles.selectBox}>
            <option value="Seleccionar.." disabled>
              Seleccionar..
            </option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
          </select>
        </div>
        <div>
          <label htmlFor="monthSelect" className={styles.selectYear}>
            Seleccionar mes:{' '}
          </label>
          <select
            id="monthSelect"
            onChange={handleMonthChange}
            defaultValue="Seleccionar.."
            className={styles.selectBox}>
            <option value="Seleccionar.." disabled>
              Seleccionar..
            </option>
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
      </div>
      {isClient && (
        <Chart options={options} series={options.series} type="bar" />
      )}
    </div>
  );
};

export default ArtistHours;
