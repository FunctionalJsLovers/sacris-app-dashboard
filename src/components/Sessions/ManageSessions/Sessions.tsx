import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Icon } from '@iconify/react';
import Error from '@/components/PopUps/Error/Error';
import Success from '@/components/PopUps/Success/Success';
import SessionOperations from '@/components/Sessions/ManageSessions/SessionOperations/SessionOperations';
import axios from 'axios';

interface SessionProps {
  appointmentId: string;
}

interface Session {
  id: string;
  date: string;
  estimated_time: number;
  status: string;
  price: number;
  appointment_id: string;
}

const Sessions = ({ appointmentId }: SessionProps) => {
  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [createMode, setCreateMode] = useState(true);
  const [editMode, setIsEditMode] = useState(false);
  const [deleteMode, setIsDeleteMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/admin/appointments/${appointmentId}/sessions`)
      .then((response) => {
        if (Array.isArray(response.data.sessions)) {
          setAllSessions(response.data.sessions);
        } else {
          console.error('No se encontró sesiones válidas:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error al cargar las sesiones:', error);
      });
  }, []);

  const reloadSessions = () => {
    axios
      .get(`${apiBaseUrl}/admin/appointments/${appointmentId}/sessions`)
      .then((response) => {
        if (Array.isArray(response.data.sessions)) {
          setAllSessions(response.data.sessions);
        } else {
          console.error('No se encontró sesiones válidas:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error al cargar las sesiones:', error);
      });
  };

  useEffect(() => {
    if (reloadSessions) {
      reloadSessions();
    }
  }, [reloadSessions]);

  const clearAllModes = () => {
    setIsEditMode(false);
    setIsDeleteMode(false);
    setCreateMode(false);
    setIsCreating(false);
    setIsCreating(false);
  };

  useEffect(() => {
    if (editMode) {
      setIsEditing(true);
    } else if (createMode) {
      setIsCreating(true);
    } else {
      setIsEditing(false);
      setIsCreating(false);
    }
  });

  const handleEditClick = () => {
    clearAllModes();
    setIsEditMode(true);
  };

  const handleDeleteClick = () => {
    clearAllModes();
    setIsDeleteMode(true);
  };

  return (
    <div className={styles.containerSession}>
      {error && <Error message={error} onClose={() => setError(null)} />}
      {success && (
        <Success message={success} onClose={() => setSuccess(null)} />
      )}
      <div className={styles.header}>
        <h1 className={styles.title}>Sesión</h1>
        <div className={styles.icons}>
          <span
            className={styles.iconAdd}
            onClick={() => {
              clearAllModes();
              setCreateMode(true);
            }}>
            <Icon
              icon={'ri:add-circle-fill'}
              color={createMode ? '#cb3230' : '#BBBFC1'}
              width={30}
              height={30}></Icon>
          </span>
          <span
            className={styles.iconEdit}
            onClick={() => {
              clearAllModes();
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
              clearAllModes();
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
      <div className={styles.sessionSection}>
        <div className={styles.sectionListSessions}>
          <div className={styles.listSessions}>
            {allSessions.map((session) => (
              <span
                key={session.id}
                onClick={() => {
                  setSelectedSessionId(session.id);
                  handleEditClick();
                }}>
                {session.id}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.rightSection}>
          {createMode && (
            <SessionOperations
              sessionId={' '}
              appointmentId={appointmentId}
              isEditing={isEditing}
              isCreating={isCreating}
            />
          )}
          {editMode && !selectedSessionId && (
            <SessionOperations
              sessionId={' '}
              appointmentId={appointmentId}
              isEditing={isEditing}
              isCreating={isCreating}
            />
          )}
          {deleteMode && !selectedSessionId && (
            <SessionOperations
              sessionId={' '}
              appointmentId={appointmentId}
              isEditing={isEditing}
              isCreating={isCreating}
            />
          )}
          {selectedSessionId && editMode && (
            <SessionOperations
              sessionId={selectedSessionId}
              appointmentId={appointmentId}
              isEditing={isEditing}
              isCreating={isCreating}
            />
          )}
          {selectedSessionId && deleteMode && (
            <SessionOperations
              sessionId={selectedSessionId}
              appointmentId={appointmentId}
              isEditing={isEditing}
              isCreating={isCreating}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sessions;
