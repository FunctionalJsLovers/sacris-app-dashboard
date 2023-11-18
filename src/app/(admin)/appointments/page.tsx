'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import AccountSection from '@/components/AccountSection/AccountSection';
import axios from 'axios';
import EditDltAppointment from '@/components/Appointment/ManageAppointments/EditDltAppointment/EditDltAppointment';
import CreateAppointment from '@/components/Appointment/ManageAppointments/CreateAppointment/CreateAppointment';
import { Icon } from '@iconify/react/dist/iconify.js';
import Default from '@/components/Default/Default';
import Sessions from '@/components/Sessions/ManageSessions/Sessions';

interface Appointment {
  id: string;
  description: string;
  artist_id: string;
  client_id: string;
  category_id: string;
  identifier: string;
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
  const [showSessionContent, setShowSessionContent] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [editMode, setIsEditMode] = useState(false);
  const [deleteMode, setIsDeleteMode] = useState(false);
  const [defaultMode, setIsDefaultMode] = useState(true);
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/admin/appointments/`)
      .then((response) => {
        if (Array.isArray(response.data.appointments)) {
          setAllAppointments(response.data.appointments);
        } else {
          console.error(
            'La respuesta no contiene una matriz de citas válida:',
            response.data,
          );
        }
      })
      .catch((error) => {
        console.error('Error al cargar las citas:', error);
      });
  }, []);

  const reloadAppointments = () => {
    axios
      .get(`${apiBaseUrl}/admin/appointments/`)
      .then((response) => {
        if (Array.isArray(response.data.appointments)) {
          setAllAppointments(response.data.appointments);
        } else {
          console.error('No se encontró citas válidas:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error al cargar las citas:', error);
      });
  };

  useEffect(() => {
    reloadAppointments();
  }, [reloadAppointments()]);

  useEffect(() => {
    const filtered = allAppointments.filter((appointment) =>
      appointment.identifier.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, allAppointments]);

  const clearAll = () => {
    setShowSessionContent(false);
    setShowEditAppointment(false);
    setShowCreateAppointment(false);
    setEditWithoutId(false);
    setShowDeleteAppointment(false);
    setDeleteWithoutId(false);
    setIsDefaultMode(false);
    clearModes();
  };
  const handleCreateClick = () => {
    clearAll();
    setShowCreateAppointment(true);
  };

  const handleEditClick = () => {
    clearAll();
    setIsEditing(true);
    setIsEditMode(true);
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

  const handleSessionSection = () => {
    setShowSessionContent(true);
  };

  const clearModes = () => {
    setIsDeleteMode(false);
    setIsEditMode(false);
    setIsDefaultMode(false);
  };

  return (
    <div
      className={
        showSessionContent
          ? styles.allAppointmentSectionDE
          : styles.allAppointmentSection
      }>
      <AccountSection photoUrl="https://th.bing.com/th/id/OIP.hFh4Uw00oR7qfvoCqnG8fQHaEK?w=186&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
      <div
        className={
          showSessionContent
            ? styles.appointmentsContentSession
            : styles.appointmentsContent
        }>
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
                  key={appointment.id}
                  onClick={() => {
                    setSelectedAppointmentId(appointment.id);
                    handleEditClick();
                  }}>
                  {appointment.identifier}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.onlyAppointmentContainer}>
            {defaultMode && <Default />}

            {selectedAppointmentId && editMode && (
              <EditDltAppointment
                appointment_id={selectedAppointmentId}
                isEditing={isEditing}
              />
            )}

            {editWithoutId && !selectedAppointmentId && (
              <EditDltAppointment appointment_id={' '} isEditing={isEditing} />
            )}

            {selectedAppointmentId && deleteMode && (
              <EditDltAppointment
                appointment_id={selectedAppointmentId}
                isEditing={isEditing}
              />
            )}

            {deleteWithoutId && !selectedAppointmentId && (
              <EditDltAppointment appointment_id={' '} isEditing={isEditing} />
            )}

            {showCreateAppointment && <CreateAppointment />}
            {!showCreateAppointment && !defaultMode && (
              <div className={styles.lineSeparator}>
                <div className={styles.halfLine}></div>
                <Icon
                  className={styles.arrowIcon}
                  icon={'ri:arrow-down-double-line'}
                  color={'grey'}
                  onClick={handleSessionSection}></Icon>
                <div className={styles.fullLine}></div>
              </div>
            )}

            {selectedAppointmentId && showSessionContent && (
              <Sessions appointmentId={selectedAppointmentId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
