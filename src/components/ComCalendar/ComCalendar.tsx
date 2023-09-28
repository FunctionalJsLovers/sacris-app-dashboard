"use client";
import React, {useEffect, useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import styles from './styles.module.css';

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

const appointments: Appointment[] = [
    {
        sessionId: "123",
        createdAt: "2023-09-26T09:00:00",
        date: "2023-09-28T10:00:00",
        estimatedTime: 60,
        status: "sin pagar",
        price: "50",
        appointmentIdFk: "456",
        description: "Cita para césar",
    },
    {
        sessionId: "1234",
        createdAt: "2023-09-26T09:00:00",
        date: "2023-09-28T10:00:00",
        estimatedTime: 60,
        status: "sin pagar",
        price: "50",
        appointmentIdFk: "456",
        description: "Cita para césar 2",
    },
    {
        sessionId: "12324",
        createdAt: "2023-09-26T12:00:00",
        date: "2023-09-28T22:00:00",
        estimatedTime: 60,
        status: "pagado",
        price: "50",
        appointmentIdFk: "456",
        description: "Cita para césar 3",
    },
];

function ComCalendar() {
    const calendarRef = useRef<FullCalendar | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null)

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
                        <p>Start: {new Date(selectedEvent.date).toLocaleString()}</p>
                        <p>End: {new Date(new Date(selectedEvent.date).getTime() + selectedEvent.estimatedTime * 60000).toLocaleString()}</p>
                        <p>Status: {selectedEvent.status}</p>
                        <p>Price: {selectedEvent.price}</p>
                        <button onClick={handleClosePopup}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>

    );
}

export default ComCalendar;