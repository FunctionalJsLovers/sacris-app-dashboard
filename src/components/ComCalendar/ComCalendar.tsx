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
  id: string;
  artistName2: string;
  date: string;
  estimated_time: number;
  status: string;
  price: number;
  appointment_id: string;
  description: string;
};

function ComCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<Session | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [appointmentDescription, setAppointmentDescription] =
    useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { data: sessionsData, error: fetchError } = useQuery(
    'sessions',
    getAllSessions,
  );
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getColorForState = (state: string): string => {
    switch (state) {
      case 'sin pagar':
        return '#BF1714';
      case 'unpaid':
        return '#BF1714';
      case 'pagado':
        return 'green';
      case 'totally_paid':
        return 'green';
      case 'prepaid':
        return 'blue';
      case 'abonado':
        return 'blue';
      case 'scheduled':
        return '#A47A28';
      default:
        return 'gray';
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const sessionsResponse = await getAllSessions();
        const sessionsWithArtistNames = await Promise.all(
          sessionsResponse.sessions.map(async (session: any) => {
            const appointmentResponse = await axios.get(
              `${apiBaseUrl}/admin/appointments/${session.appointment_id}`,
            );
            const appointmentIdResponse =
              appointmentResponse.data.appointments[0].artist_id;
            const artistResponse = await axios.get(
              `${apiBaseUrl}/admin/artists/${appointmentIdResponse}`,
            );
            return {
              ...session,
              artistName2: artistResponse.data.artists[0].name,
            };
          }),
        );
        setSessions(sessionsWithArtistNames);
      } catch (error) {
        console.error('Error al obtener los datos: ', error);
        setError('Error al obtener los datos');
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {}, [sessions]);

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    if (fetchError) {
      setError('No se pudo cargar la información de las citas');
    }
  }, [fetchError]);

  useEffect(() => {
    if (fetchError) {
      setError('No se pudo cargar la información de las citas');
    }
  }, [fetchError]);

  useEffect(() => {
    if (sessionsData && sessionsData.sessions) {
      setSessions(sessionsData.sessions);
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
    const appointment_id = event.appointment_id;
    axios
      .get(`${apiBaseUrl}/admin/appointments/${appointment_id}`)
      .then((response) => {
        const appointmentData = response.data.appointments[0];
        setAppointmentDescription(appointmentData.description);
        axios
          .get(`${apiBaseUrl}/admin/artists/${appointmentData.artist_id}`)
          .then((artistResponse) => {
            const artistData = artistResponse.data.artists[0];
            setArtistName(artistData.name);
          })
          .catch((error) => {
            console.error('Error al obtener el nombre del artista: ', error);
            setError('Error al obtener el nombre del artista');
          });
        axios
          .get(`${apiBaseUrl}/admin/clients/${appointmentData.client_id}`)
          .then((clientResponse) => {
            const clientData = clientResponse.data.clients[0];
            setClientName(clientData.name);
          })
          .catch((error) => {
            console.error('Error al obtener el nombre del cliente: ', error);
            setError('Error al obtener el nombre del cliente');
          });
      })
      .catch((error) => {
        console.error('Error al obtener la información de la cita:', error);
        setError('Error al obtener la información de la cita');
      });
  };

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
        events={sessions.map((session) => ({
          id: session.id,
          title: session.artistName2
            ? `Cita artista: ${session.artistName2.split(' ')[0]}`
            : 'Cita - Artista: No disponible',
          start: new Date(session.date),
          end: new Date(
            new Date(session.date).getTime() + session.estimated_time * 3600000,
          ),
          color: getColorForState(session.status),
        }))}
        eventClick={(clickInfo) => {
          const event = sessions.find(
            (appointment) => appointment.id === clickInfo.event.id,
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
            <p>ID: {selectedEvent.id}</p>
            <p>Inicio: {new Date(selectedEvent.date).toLocaleString()}</p>
            <p>
              Fin:{' '}
              {new Date(
                new Date(selectedEvent.date).getTime() +
                  selectedEvent.estimated_time * 60 * 60 * 1000,
              ).toLocaleString()}
            </p>
            <p>Estado: {getStatusText(selectedEvent.status)}</p>
            <p>Nombre Artista: {artistName} </p>
            <p>Nombre Cliente: {clientName}</p>
            <p>Precio: {selectedEvent.price} $</p>
            <button onClick={handleClosePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComCalendar;

function getStatusText(status: string) {
  switch (status) {
    case 'pagado':
      return 'Pagado';
    case 'totally_paid':
      return 'Pagado';
    case 'unpaid':
      return 'Sin pagar';
    case 'sin pagar':
      return 'Sin pagar';
    case 'abonado':
      return 'Abonado';
    case 'prepaid':
      return 'Abonado';
    case 'scheduled':
      return 'Agendado';
    default:
      return 'Desconocido';
  }
}
