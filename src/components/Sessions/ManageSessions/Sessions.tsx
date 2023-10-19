import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Icon } from '@iconify/react';
import Error from '@/components/PopUps/Error/Error';
import Success from '@/components/PopUps/Success/Success';
import SessionOperations from '@/components/Sessions/ManageSessions/SessionOperations/SessionOperations';

const Sessions = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [createMode, setCreateMode] = useState(true);
  const [editMode, setIsEditMode] = useState(false);
  const [deleteMode, setIsDeleteMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
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
            {/*{filteredSessions.map((appointment) => (
                <span
                    key={appointment.id}
                    onClick={() => {
                      setSelectedAppointmentId(appointment.id);
                      handleEditClick();
                    }}>
                  {appointment.id}
                </span>
            ))}*/}
          </div>
        </div>
        <div className={styles.rightSection}>
          {createMode && (
            <SessionOperations
              sessionId={' '}
              isEditing={isEditing}
              isCreating={isCreating}
            />
          )}
          {editMode && (
            <SessionOperations
              sessionId={' '}
              isEditing={isEditing}
              isCreating={isCreating}
            />
          )}
          {deleteMode && (
            <SessionOperations
              sessionId={' '}
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
