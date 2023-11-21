'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useSession } from 'next-auth/react';
import { format, isToday } from 'date-fns';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getAllAppointments } from '@/services/AppointmentAPI';
import { getAllSessions } from '@/services/SessionsAPI';

interface AccountSectionProps {
  photoUrl: string;
}

interface Session {
  id: string;
  date: string;
  estimated_time: number;
  status: string;
  price: number;
  appointment_id: string;
}

interface Appointment {
  id: string;
  description: string;
  artist_id: string;
  client_id: string;
  category_id: string;
  identifier: string;
}

interface SessionAppointment {
  appointment: Appointment;
  session: Session;
}

const AccountSection: React.FC<AccountSectionProps> = ({ photoUrl }) => {
  const { data: session } = useSession();
  const [notificationCount, setNotificationCount] = useState(0);
  const [todaySessions, setTodaySessions] = useState<Session[]>([]);
  const [displaySessions, setDisplaySessions] = useState<boolean>(false);
  const [matchedAppointments, setMatchedAppointments] = useState<
    SessionAppointment[]
  >([]);

  const { data: appointments, refetch } = useQuery({
    queryKey: ['appointments'],
    queryFn: getAllAppointments,
    refetchOnWindowFocus: false,
  });

  const { data: sessions, refetch: refetchSessions } = useQuery({
    queryKey: ['sessions'],
    queryFn: getAllSessions,
    refetchOnWindowFocus: false,
  });

  const handleSessions = () => {
    const todayS = sessions?.sessions.filter((session: Session) =>
      isToday(new Date(session.date)),
    );
    setTodaySessions(todayS || []);
    setNotificationCount(todayS?.length);
  };

  const handleMatchedSessions = () => {
    const matchedSessions = todaySessions.map((session: Session) => {
      const appointment = appointments?.appointments.find(
        (appointment: Appointment) => appointment.id === session.appointment_id,
      );
      return { appointment, session };
    });
    setMatchedAppointments(matchedSessions);
  };

  const handleDisplaySessions = () => {
    handleMatchedSessions();
    setDisplaySessions(!displaySessions);
    console.log(matchedAppointments);
  };

  useEffect(() => {
    const refetchInterval = setInterval(() => {
      refetch();
      refetchSessions();
    }, 10000);

    return () => {
      clearInterval(refetchInterval);
    };
  }, []);

  useEffect(() => {
    handleSessions();
  }, [sessions]);

  return (
    <div className={styles.accountSection}>
      <div className={styles.notificationIcon}>
        {notificationCount > 0 && displaySessions && (
          <div className={styles.notificationSessions}>
            {matchedAppointments?.map((matched: SessionAppointment) => (
              <div key={matched.session.id} className={styles.notification}>
                <p>{format(new Date(matched.session.date), 'HH:mm')}</p>
                <p>{matched.appointment.identifier}</p>
              </div>
            ))}
          </div>
        )}
        <span>{notificationCount}</span>
        <Image
          className={styles.iconN}
          src="https://cdn.icon-icons.com/icons2/494/PNG/512/alarm_icon-icons.com_48364.png"
          alt="Notificaciones"
          width={24}
          height={24}
          onClick={() => handleDisplaySessions()}
        />
      </div>
      <div className={styles.userInfo}>
        <span>{session?.user?.name}</span>
        <Image
          className={styles.userImage}
          src={photoUrl}
          alt="User Photo"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};
export default AccountSection;
