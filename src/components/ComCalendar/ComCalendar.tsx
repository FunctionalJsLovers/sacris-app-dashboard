'use client';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './styles.module.css';

interface Appointment {
  title: string;
  start: string;
  end: string;
  cliente: string;
  tatuador: string;
  state: 'sin pagar' | 'pagado' | 'abonado';
}

function ComCalendar() {
  const [appointments, setAppointments] = useState([
    {
      title: 'Cita existente',
      start: '2023-09-30T10:00:00',
      end: '2023-09-30T11:00:00',
      cliente: 'César',
      tatuador: 'César también',
      state: 'sin pagar',
    },
    {
      title: 'Prueba de cita 2',
      start: '2023-09-30T10:00:00',
      end: '2023-09-30T11:00:00',
      cliente: 'Augusto',
      tatuador: 'Augusto artista',
      state: 'abonado',
    },
    {
      title: 'Prueba de cita 3',
      start: '2023-09-30T08:00:00',
      end: '2023-09-30T12:00:00',
      cliente: 'Augusto',
      tatuador: 'Augusto artista',
      state: 'pagado',
    },
    {
      title: 'Cita césar',
      start: '2023-09-26T09:00:00',
      end: '2023-09-26T11:00:00',
      cliente: 'César',
      tatuador: 'César también',
      state: 'pagado',
    },
  ]);

  const getColorForState = (state: string): string => {
    switch (state) {
      case 'sin pagar':
        return 'red';
      case 'pagado':
        return 'green';
      case 'abonado':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <div className={styles.fullCalendar}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height={'80vh'}
        events={appointments.map((appointment) => ({
          ...appointment,
          color: getColorForState(appointment.state),
        }))}
      />
    </div>
  );
}

export default ComCalendar;
