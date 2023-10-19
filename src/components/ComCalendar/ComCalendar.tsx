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
import { addHours } from 'date-fns';

type Session = {
  id: string;
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
  const [categoryName, setCategoryName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { data: sessionsData, error: fetchError } = useQuery(
    'sessions',
    getAllSessions,
  );
  const apiBaseUrl = 'http://34.220.171.214:9000/admin';

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

  {
    /*  const fetchAppointmentData = (event: Session) => {
    const appointment_id = event.appointment_id;
    axios
        .get(
            `${apiBaseUrl}/appointments/${appointment_id}`,
        )
        .then((response) => {
          const appointmentData = response.data.appointments[0];
          setAppointmentDescription(appointmentData.description);
          axios
              .get(
                  `${apiBaseUrl}/artists/${appointmentData.artist_id}`,
              )
              .then((artistResponse) => {
                const artistData = artistResponse.data.artists[0];
                console.log("Artista: ", artistResponse)
                setArtistName(artistData.name);
              })
              .catch((error) => {
                console.error('Error al obtener el nombre del artista: ', error);
                setError('Error al obtener el nombre del artista');
              });
          axios
              .get(
                  `${apiBaseUrl}/clients/${response.data.client_id}`,
              )
              .then((clientResponse) => {
                const clientData = clientResponse.data.clients[0];
                setClientName(clientData.name);
              })
              .catch((error) => {
                console.error('Error al obtener el nombre del cliente: ', error);
                setError('Error al obtener el nombre del cliente');
              });
          axios
              .get(
                  `${apiBaseUrl}/categories/${response.data.category_id}`,
              )
              .then((categoryResponse) => {
                const categoryData = categoryResponse.data.categories[0];
                setCategoryName(categoryData.name);
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
*/
  }

  const fetchAppointmentData = (event: Session) => {
    const appointment_id = event.appointment_id;
    axios
      .get(`${apiBaseUrl}/appointments/${appointment_id}`)
      .then((response) => {
        const appointmentData = response.data.appointments[0];
        setAppointmentDescription(appointmentData.description);
        setArtistName(appointmentData.artist_id);
        setClientName(appointmentData.client_id);
        setCategoryName(appointmentData.category_id);
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
        events={sessions.map((appointment) => ({
          id: appointment.id,
          title: appointment.id,
          start: new Date(appointment.date),
          end: new Date(
            new Date(appointment.date).getTime() +
              appointment.estimated_time * 3600000,
          ),
          color: getColorForState(appointment.status),
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
