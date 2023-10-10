'use client';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import styles from './styles.module.css';
import Error from '@/components/PopUps/Error/Error';
import { useQuery } from 'react-query';
import { getAllSessions } from '@/services/SessionsAPI';
import axios from 'axios';

type Session = {
  sessionId: string;
  createdAt: string;
  date: string;
  estimatedTime: number;
  status: string;
  price: string;
  appointmentIdFk: string;
  description: string;
};

function ComCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<Session | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [appointmentDescription, setAppointmentDescription] =
    useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { data: sessionsData, error: fetchError } = useQuery(
    'sessions',
    getAllSessions,
  );

  const getColorForState = (state: string): string => {
    switch (state) {
      case 'sin pagar' || 'Sin pagar':
        return 'red';
      case 'pagado' || 'Pagado':
        return 'green';
      case 'abonado' || 'Abonado':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    if (fetchError) {
      setError('No se pudo cargar la información de las citas');
    }
  }, [fetchError]);

  useEffect(() => {
    if (sessionsData) {
      setSessions(sessionsData);
    }
  });

  useEffect(() => {
    if (fetchError) {
      setError('No se pudo cargar la información de las citas');
    }
  }, [fetchError]);

  useEffect(() => {
    if (sessionsData) {
      setSessions(sessionsData);
    }
  }, [sessionsData]);

  useEffect(() => {
    const headerButtons = document.querySelectorAll(
      '.fc-header-toolbar button',
    );
    if (headerButtons) {
      headerButtons.forEach((button) => {
        (button as HTMLElement).style.backgroundColor = '#78160C';
        (button as HTMLElement).style.borderColor = 'black';
      });
    }
  }, []);

  const fetchAppointmentData = (event: Session) => {
    const appointmentId = event.appointmentIdFk;
    axios
      .get(
        `https://handsomely-divine-abstracted-bed.deploy.space/appointments/${appointmentId}`,
      )
      .then((response) => {
        setAppointmentDescription(response.data.description);
        axios
          .get(
            `https://handsomely-divine-abstracted-bed.deploy.space/artists/${response.data.artistIdFk}`,
          )
          .then((artistResponse) => {
            setArtistName(artistResponse.data.name);
          })
          .catch((error) => {
            console.error('Error al obtener el nombre del artista: ', error);
            setError('Error al obtener el nombre del artista');
          });
        axios
          .get(
            `https://handsomely-divine-abstracted-bed.deploy.space/clients/${response.data.clientIdFk}`,
          )
          .then((clientResponse) => {
            setClientName(clientResponse.data.name);
          })
          .catch((error) => {
            console.error('Error al obtener el nombre del cliente: ', error);
            setError('Error al obtener el nombre del cliente');
          });
        axios
          .get(
            `https://handsomely-divine-abstracted-bed.deploy.space/categories/${response.data.categoryIdFk}`,
          )
          .then((categoryResponse) => {
            setCategoryName(categoryResponse.data.name);
          })
          .catch((error) => {
            console.error(
              'Error al obtener el nombre de la categoría: ',
              error,
            );
            setError('Error al obtener el nombre de la categoría');
          });
      })
      .catch((error) => {
        console.error('Error al obtener la información de la cita:', error);
        setError('Error al obtener la información de la cita');
      });
  };

  console.log(sessionsData);

  return (
    <div className={styles.fullCalendar}>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day',
          list: 'List',
        }}
        height={'80vh'}
        timeZone="UTC"
        events={sessions.map((appointment) => ({
          id: appointment.sessionId,
          title: appointment.sessionId,
          start: new Date(appointment.date),
          end: new Date(
            new Date(appointment.date).getTime() +
              appointment.estimatedTime * 3600000,
          ),
          color: getColorForState(appointment.status),
        }))}
        eventClick={(clickInfo) => {
          const event = sessions.find(
            (appointment) => appointment.sessionId === clickInfo.event.id,
          );
          if (event) {
            setSelectedEvent(event);
          }

          if (event) {
            setSelectedEvent(event);
            fetchAppointmentData(event);
          }
        }}
      />
      {error && <Error message={error} onClose={() => setError(null)} />}
      {selectedEvent && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>{appointmentDescription}</h2>
            <p>ID: {selectedEvent.sessionId}</p>
            <p>
              Inicio:{' '}
              {new Date(selectedEvent.date)
                .toISOString()
                .replace(/T/, ' ')
                .replace(/\..+/, '')}
            </p>
            <p>
              Fin:{' '}
              {new Date(
                new Date(selectedEvent.date).getTime() +
                  selectedEvent.estimatedTime * 60000,
              )
                .toISOString()
                .replace(/T/, ' ')
                .replace(/\..+/, '')}
            </p>
            <p>Estado: {selectedEvent.status}</p>
            <p>Nombre Artista: {artistName}</p>
            <p>Nombre Cliente: {clientName}</p>
            <p>Categoría: {categoryName}</p>
            <p>Precio: {selectedEvent.price}</p>
            <button onClick={handleClosePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComCalendar;
