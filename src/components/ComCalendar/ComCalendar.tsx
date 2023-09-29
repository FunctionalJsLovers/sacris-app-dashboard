"use client";
import React, {useEffect, useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import axios from "axios";
import styles from './styles.module.css';
import Error from "@/components/PopUps/Error/Error";

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
    const [selectedEvent, setSelectedEvent] = useState<Session | null>(null)
    const [sessions, setSessions] = useState<Session[]>([]);
    const [appointmentDescription, setAppointmentDescription] = useState<string>("");
    const [artistName, setArtistName] = useState<string>("")
    const [error, setError] = useState<string | null>(null);
    const getColorForState = (state: string): string => {
        switch (state) {
            case "sin pagar":
                return "red";
            case "pagado":
                return "green";
            case "abonado":
                return "blue";
            default:
                return "gray";
        }
    };

    const handleClosePopup = () => {
        setSelectedEvent(null);
    }

    useEffect(() => {
        axios.get("https://handsomely-divine-abstracted-bed.deploy.space/sessions/?totalCount=false")
            .then((response) => {
                setSessions(response.data);
            })
            .catch((error) => {
                console.log(error);
                setError("No se pudo cargar la información de las citas");
            });
    }, []);

    useEffect(() => {
        const headerButtons = document.querySelectorAll(".fc-header-toolbar button");
        if (headerButtons) {
            headerButtons.forEach((button) => {
                (button as HTMLElement).style.backgroundColor = "#78160C";
                (button as HTMLElement).style.borderColor = "black";
            });
        }
    }, []);

    const fetchAppointmentData = (event: Session) => {
        const appointmentId = event.appointmentIdFk;
        axios.get(`https://handsomely-divine-abstracted-bed.deploy.space/appointments/${appointmentId}`)
            .then((response) => {
                setAppointmentDescription(response.data.description);
                axios.get(`https://handsomely-divine-abstracted-bed.deploy.space/artists/${response.data.artistIdFk}`)
                    .then((artistResponse) => {
                        setArtistName(artistResponse.data.name)
                    })
                    .catch((error) => {
                        console.error("Error al obtener el nombre del artista: ", error)
                        setError("Error al obtener el nombre del artista");
                    })
            })
            .catch((error) => {
                console.error("Error al obtener la información de la cita:", error);
                setError("Error al obtener la información de la cita");
            });
    }

    return (
        <div className={styles.fullCalendar}>
            <FullCalendar
                plugins={[dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar ={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                buttonText={{
                    today: "Today",
                    month: "Month",
                    week: "Week",
                    day: "Day",
                    list: "List"
                }}
                height={"80vh"}

                events={sessions.map(appointment => ({
                    id: appointment.sessionId,
                    title: appointmentDescription,
                    start: new Date(appointment.date),
                    end: new Date(new Date(appointment.date).getTime() + appointment.estimatedTime * 60000),
                    color: getColorForState(appointment.status)
                }))}
                eventClick={(clickInfo) => {
                    const event = sessions.find(appointment => appointment.sessionId === clickInfo.event.id);
                    if (event) {
                        setSelectedEvent(event);
                    }

                    if (event) {
                        setSelectedEvent(event);
                        fetchAppointmentData(event);
                    }
                }}
            />
            {error && <Error message={error} onClose={() => setError(null)}/>}
            {selectedEvent && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h2>{appointmentDescription}</h2>
                        <p>Inicio: {new Date(selectedEvent.date).toLocaleString()}</p>
                        <p>Fin: {new Date(new Date(selectedEvent.date).getTime() + selectedEvent.estimatedTime * 60000).toLocaleString()}</p>
                        <p>Estado: {selectedEvent.status}</p>
                        <p>Nombre Artista: {artistName}</p>
                        <p>Precio: {selectedEvent.price}</p>
                        <button onClick={handleClosePopup}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ComCalendar;