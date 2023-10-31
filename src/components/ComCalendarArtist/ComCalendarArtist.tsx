'use client';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import styles from './styles.module.css';
import Error from '@/components/PopUps/Error/Error';
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

function ComCalendarArtist() {
  const [selectedEvent, setSelectedEvent] = useState<Session | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [appointmentDescription, setAppointmentDescription] =
    useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [artistsData, setArtistsData] = useState<any[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);

  const getColorForState = (state: string): string => {
    switch (state.toLowerCase()) {
      case 'sin pagar':
        return '#BF1714';
      case 'unpaid':
        return '#BF1714';
      case 'pagado':
        return 'green';
      case 'paid':
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
    axios
      .get(`${apiBaseUrl}/admin/artists`)
      .then((response) => {
        const artistList = response.data.artists;
        setArtistsData(artistList);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de artistas: ', error);
      });
  }, []);

  const handleArtistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArtistId = event.target.value;
    setSelectedArtistId(selectedArtistId);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    if (selectedArtistId) {
      axios
        .get(`${apiBaseUrl}/admin/artists/${selectedArtistId}/sessions`)
        .then(async (response) => {
          const artistSessions = response.data.sessions;
          if (artistSessions.length === 0) {
            setError('El artista seleccionado no tiene ninguna cita asignada');
            setCalendarEvents([]);
          } else {
            const clientNamePromises = artistSessions.map(
              async (session: any) => {
                const appointmentId = session.appointment_id;
                const appointmentResponse = await axios.get(
                  `${apiBaseUrl}/admin/appointments/${appointmentId}`,
                );
                const appointmentData =
                  appointmentResponse.data.appointments[0];
                const clientId = appointmentData.client_id;
                const clientResponse = await axios.get(
                  `${apiBaseUrl}/admin/clients/${clientId}`,
                );
                const clientData = clientResponse.data.client;
                const clientName = clientData.name;
                return clientName;
              },
            );
            const clientNames = await Promise.all(clientNamePromises);
            const calendarEvents = artistSessions.map(
              (session: any, index: number) => {
                const title = `Cita cliente: ${clientNames[index]}`;
                return {
                  id: session.id,
                  title: title,
                  start: new Date(session.date),
                  end: new Date(
                    new Date(session.date).getTime() +
                      session.estimated_time * 3600000,
                  ),
                  color: getColorForState(session.status),
                };
              },
            );
            setSessions(artistSessions);
            setCalendarEvents(calendarEvents);
          }
        })
        .catch((error) => {
          console.error('Error al obtener las sesiones del artistas: ', error);
        });
    }
  }, [selectedArtistId]);

  useEffect(() => {}, [sessions]);

  useEffect(() => {}, [calendarEvents]);

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
            const artistData = artistResponse.data.artist;
            setArtistName(artistData.name);
          })
          .catch((error) => {
            console.error('Error al obtener el nombre del artista: ', error);
            setError('Error al obtener el nombre del artista');
          });
        axios
          .get(`${apiBaseUrl}/admin/clients/${appointmentData.client_id}`)
          .then((clientResponse) => {
            const clientData = clientResponse.data.client;
            setClientName(clientData.name);
          })
          .catch((error) => {
            console.error('Error al obtener el nombre del cliente: ', error);
            setError('Error al obtener el nombre del cliente');
          });
        setSelectedEvent(event);
      })
      .catch((error) => {
        console.error('Error al obtener la información de la cita:', error);
        setError('Error al obtener la información de la cita');
      });
  };

  return (
    <div className={styles.fullCalendar}>
      <select
        className={styles.artistOptions}
        value={selectedArtistId || ''}
        onChange={handleArtistChange}>
        <option value="">Selecciona un artista</option>
        {artistsData.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.name}
          </option>
        ))}
      </select>
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
        height={'70vh'}
        events={calendarEvents}
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

export default ComCalendarArtist;

function getStatusText(status: string) {
  console.log(status);
  switch (status.toLowerCase()) {
    case 'pagado':
      return 'Pagado';
    case 'totally_paid':
      return 'Pagado';
    case 'paid':
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
