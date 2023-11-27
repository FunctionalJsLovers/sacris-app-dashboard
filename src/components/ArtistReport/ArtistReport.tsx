import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import { Icon } from '@iconify/react/dist/iconify.js';

interface ArtistCalendarPopupProps {
  artistName: string;
  onClose: () => void;
}

function ArtistReport({ artistName, onClose }: ArtistCalendarPopupProps) {
  const [sessionsCount, setSessionsCount] = useState<number | null>(null);
  const [hoursWorkedCount, setHoursWorkedCount] = useState<number | null>(null);
  const [salesLastMonthCount, setSalesLastMonthCount] = useState<number | null>(
    null,
  );
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${apiBaseUrl}/admin/topArtistByNumberOfSessions`)
      .then((response) => response.json())
      .then((data: { artist: { [key: string]: number } }) => {
        const sessionsForSelectedArtist = data.artist[artistName] || 0;
        setSessionsCount(sessionsForSelectedArtist);
      })
      .catch((error) => console.error('Error obteniendo las sesiones:', error));
  }, [artistName]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/admin/topArtistByWorkedHours`)
      .then((response) => response.json())
      .then((data: { artist: { [key: string]: number } }) => {
        const hoursWorkedForSelectedArtist = data.artist[artistName] || 0;
        setHoursWorkedCount(hoursWorkedForSelectedArtist);
      })
      .catch((error) =>
        console.error('Error obteniendo las horas trabajadas', error),
      );
  }, [artistName]);

  useEffect(() => {
    fetch(`${apiBaseUrl}/admin/totalSalesLast30Days`)
      .then((response) => response.json())
      .then((data: { artist: { [key: string]: number } }) => {
        const salesLastMonthForSelectedArtist = data.artist[artistName] || 0;
        setSalesLastMonthCount(salesLastMonthForSelectedArtist);
      })
      .catch((error) =>
        console.error('Error obteniendo el valor de trabajo', error),
      );
  }, [artistName]);

  return (
    <div className={styles.popupContainer}>
      <Icon
        icon={'ri:close-circle-line'}
        onClick={onClose}
        className={styles.iconClose}
        height={35}
        width={35}
      />
      <h3>Reporte de los últimos 30 días</h3>
      <div className={styles.reportSection}>
        <div className={styles.firstLine}>
          <div className={styles.sessions}>
            <div className={styles.text}>
              <h1>Sesiones</h1>
              <h1>Realizadas</h1>
            </div>
            <div className={styles.value}>
              <h1>{sessionsCount !== null ? sessionsCount : '...'}</h1>
            </div>
          </div>
          <div className={styles.hoursWorked}>
            <div className={styles.text}>
              <h1>Horas</h1>
              <h1>Trabajadas</h1>
            </div>
            <div className={styles.value}>
              <h1>{hoursWorkedCount !== null ? hoursWorkedCount : '...'}</h1>
            </div>
          </div>
        </div>
        <div className={styles.secondLine}>
          <div className={styles.sales}>
            <div className={styles.textSales}>
              <h1>Ingresos</h1>
              <h1>Generados</h1>
            </div>
            <div className={styles.valueSales}>
              <h1>
                {salesLastMonthCount !== null
                  ? formatNumberColombianStyle(salesLastMonthCount)
                  : '...'}
              </h1>
              <div className={styles.pesos}>pesos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistReport;

function formatNumberColombianStyle(num: number | null) {
  if (num !== null && typeof num === 'number') {
    return num.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  } else {
    return null;
  }
}
