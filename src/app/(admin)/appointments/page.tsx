'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import AccountSection from '@/components/AccountSection/AccountSection';
import axios from 'axios';
import EditDltAppointment from '@/components/Appointment/ManageAppointments/EditDltAppointment/EditDltAppointment';
import CreateAppointment from '@/components/Appointment/ManageAppointments/CreateAppointment/CreateAppointment';
import { Icon } from '@iconify/react/dist/iconify.js';

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
  const [editMode, setIsEditMode] = useState(false);
  const [deleteMode, setIsDeleteMode] = useState(false);

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

  const clearModes = () => {
    setIsDeleteMode(false);
    setIsEditMode(false);
  };

  return (
    <div className={styles.allAppointmentSection}>
      <AccountSection
        notificationCount={2}
        photoUrl="https://th.bing.com/th/id/OIP.hFh4Uw00oR7qfvoCqnG8fQHaEK?w=186&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7"
      />
      <div className={styles.appointmentsContent}>
        <div className={styles.appointmentsHeader}>
          <div className={styles.title}>Citas</div>
          <div className={styles.icons}>
            <span
              className={styles.iconAdd}
              onClick={() => {
                handleCreateClick();
                clearModes();
              }}>
              <Icon
                icon={'ri:add-circle-fill'}
                color={showCreateAppointment ? '#cb3230' : '#BBBFC1'}
                width={30}
                height={30}></Icon>
            </span>
            <span
              className={styles.iconEdit}
              onClick={() => {
                handleEditWithoutId();
                setIsEditing(true);
                clearModes();
                setIsEditMode(true);
              }}>
              <Icon
                icon={'tabler:edit'}
                color={editMode ? '#cb3230' : '#BBBFC1'}
                width={30}
                height={30}></Icon>
            </span>
            <span
              className={styles.iconDelete}
              onClick={() => {
                handleDeleteWithoutId();
                setIsEditing(false);
                clearModes();
                setIsDeleteMode(true);
              }}>
              <Icon
                icon={'typcn:delete-outline'}
                color={deleteMode ? '#cb3230' : '#BBBFC1'}
                width={30}
                height={30}></Icon>
            </span>
          </div>
        </div>
        <div className={styles.appointmentsContainer}>
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
    </div>
  );
};

export default Appointments;
