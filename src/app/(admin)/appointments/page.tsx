'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import AccountSection from '@/components/AccountSection/AccountSection';
import axios from 'axios';
import EditDltAppointment from '@/components/Appointment/ManageAppointments/EditDltAppointment/EditDltAppointment';
import CreateAppointment from '@/components/Appointment/ManageAppointments/CreateAppointment/CreateAppointment';
import NavBar from '@/components/NavBar/NavBar';

const routes = [
  {
    name: 'Artistas',
    path: '/dashboard/artist',
    icon: '/images/iconsNSelect/artists.png',
    text: 'None',
  },
  {
    name: 'Citas',
    path: '/dashboard/appointments',
    icon: '/images/iconsSelect/appointments.png',
    text: 'Red',
  },
  {
    name: 'Calendario',
    path: '/dashboard/calendar',
    icon: '/images/iconsNSelect/calendar.png',
    text: 'None',
  },
  {
    name: 'Productos',
    path: '/',
    icon: '/images/iconsNSelect/products.png',
    text: 'None',
  },
  {
    name: 'Reportes',
    path: '/',
    icon: '/images/iconsNSelect/reports.png',
    text: 'None',
  },
];

interface Appointment {
  appointmentId: string;
  description: string;
  artistId: string;
  clientId: string;
  categoryId: string;
}

const Appointments: React.FC = () => {
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [editWithoutId, setEditWithoutId] = useState(false);
  const [deleteWithoutId, setDeleteWithoutId] = useState(false);
  const [showCreateAppointment, setShowCreateAppointment] = useState(false);
  const [showEditAppointment, setShowEditAppointment] = useState(false);
  const [showDeleteAppointment, setShowDeleteAppointment] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    axios
      .get(
        'https://handsomely-divine-abstracted-bed.deploy.space/appointments/?totalCount=false',
      )
      .then((response) => {
        setAllAppointments(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar las citas:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = allAppointments.filter((appointment) =>
      appointment.appointmentId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, allAppointments]);

  const clearAll = () => {
    setShowEditAppointment(false);
    setShowCreateAppointment(false);
    setEditWithoutId(false);
    setShowDeleteAppointment(false);
    setDeleteWithoutId(false);
  };
  const handleCreateClick = () => {
    clearAll();
    setShowCreateAppointment(true);
  };

  const handleEditClick = () => {
    clearAll();
    setShowEditAppointment(true);
  };

  const handleEditWithoutId = () => {
    clearAll();
    setEditWithoutId(true);
  };

  const handleDeleteWithoutId = () => {
    clearAll();
    setDeleteWithoutId(true);
  };

  return (
    <div className={styles.allAppointmentSection}>
      <NavBar routes={routes} />
      <AccountSection
        notificationCount={2}
        photoUrl="https://th.bing.com/th/id/OIP.hFh4Uw00oR7qfvoCqnG8fQHaEK?w=186&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7"
      />
      <div className={styles.appointmentsContent}>
        <div className={styles.title}>Citas</div>
        <div className={styles.icons}>
          <span
            className={styles.iconAdd}
            onClick={() => {
              handleCreateClick();
            }}></span>
          <span
            className={styles.iconEdit}
            onClick={() => {
              handleEditWithoutId();
              setIsEditing(true);
            }}></span>
          <span
            className={styles.iconDelete}
            onClick={() => {
              handleDeleteWithoutId();
              setIsEditing(false);
            }}></span>
        </div>
        <div className={styles.appointmentsListSection}>
          <input
            type={'text'}
            className={styles.inputSearch}
            placeholder={'Identificador de la cita'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.listAppointments}>
            {filteredAppointments.map((appointment) => (
              <span
                key={appointment.appointmentId}
                onClick={() => {
                  setSelectedAppointmentId(appointment.appointmentId);
                  handleEditClick();
                }}>
                {appointment.appointmentId}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.appointmentSessionContainer}>
          {selectedAppointmentId && showEditAppointment && (
            <EditDltAppointment
              appointmentId={selectedAppointmentId}
              isEditing={isEditing}
            />
          )}

          {editWithoutId && (
            <EditDltAppointment appointmentId={' '} isEditing={isEditing} />
          )}

          {selectedAppointmentId && showDeleteAppointment && (
            <EditDltAppointment
              appointmentId={selectedAppointmentId}
              isEditing={isEditing}
            />
          )}

          {deleteWithoutId && (
            <EditDltAppointment appointmentId={' '} isEditing={isEditing} />
          )}

          {showCreateAppointment && <CreateAppointment />}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
