'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import styles from './styles.module.css';
import Error from '../../../PopUps/Error/Error';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Session {
  id: string;
  date: string;
  estimated_time: number;
  status: string;
  price: number;
  appointment_id: string;
}

const MonthAppointments: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    setIsClient(true);
    fetch(`${apiBaseUrl}/admin/sessions`)
      .then((response) => response.json())
      .then((data) => setSessions(data.sessions))
      .catch((error) => console.error('Error obteniendo las sesiones:', error));
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const sessionsForSelectedYear = sessions.filter(
        (session) => new Date(session.date).getFullYear() === selectedYear,
      );
      if (!sessionsForSelectedYear.length) {
        setError('No hay sesiones registradas para el año seleccionado.');
      } else {
        setError(null);
      }
    }
  }, [selectedYear, sessions]);

  const groupAppointmentsByMonth = () => {
    if (!selectedYear) return [];

    interface GroupedSessions {
      [key: string]: number;
    }
    const groupedSessions: GroupedSessions = {};

    sessions.forEach((session) => {
      const year = new Date(session.date).getFullYear();
      const month = new Date(session.date).getMonth() + 1;
      if (year === selectedYear) {
        const key = `${year}-${month}`;
        groupedSessions[key] = (groupedSessions[key] || 0) + 1;
      }
    });

    return Object.keys(groupedSessions).map((key) => ({
      year: selectedYear,
      month: parseInt(key.split('-')[1], 10),
      count: groupedSessions[key],
    }));
  };

  const series = [
    {
      name: 'Citas',
      data: groupAppointmentsByMonth().map((group) => group.count),
    },
  ];

  const options: ApexOptions = {
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
      categories: groupAppointmentsByMonth().map((group) => {
        const monthNames = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ];
        return monthNames[group.month - 1];
      }),
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
      y: {
        formatter: function (value) {
          return Math.round(value).toString();
        },
      },
    },
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  return (
    <div className={styles.report}>
      {error && <Error message={error} onClose={() => setError(null)} />}
      <div className={styles.title}>Sesiones por mes</div>
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
      {isClient && <Chart options={options} series={series} type="bar" />}
    </div>
  );
};

export default MonthAppointments;
