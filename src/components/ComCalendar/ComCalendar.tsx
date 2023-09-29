"use client";
import React, {useEffect, useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import axios from "axios";
import styles from './styles.module.css';
import  { useQuery } from "react-query";

type Appointment = {
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
    const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null)
    const [appointments, setAppointments] = useState<Appointment[]>([]);



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
        axios.get("/resources/appointments.json")
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => {
                console.error("F, no se cargaron los datos :(: ", error);
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

                events={appointments.map(appointment => ({
                    id: appointment.sessionId,
                    title: appointment.description,
                    start: new Date(appointment.date),
                    end: new Date(new Date(appointment.date).getTime() + appointment.estimatedTime * 60000),
                    color: getColorForState(appointment.status)
                }))}
                eventClick={(clickInfo) => {
                    const event = appointments.find(appointment => appointment.sessionId === clickInfo.event.id);
                    if (event) {
                        console.log(event)
                        setSelectedEvent(event);
                    }
                }}
            />
            {selectedEvent && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h2>{selectedEvent.description}</h2>
                        <p>Inicio: {new Date(selectedEvent.date).toLocaleString()}</p>
                        <p>Fin: {new Date(new Date(selectedEvent.date).getTime() + selectedEvent.estimatedTime * 60000).toLocaleString()}</p>
                        <p>Estado: {selectedEvent.status}</p>
                        <p>ID Artista: {selectedEvent.appointmentIdFk}</p>
                        <p>Precio: {selectedEvent.price}</p>
                        <button onClick={handleClosePopup}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>

    );
}

export default ComCalendar;