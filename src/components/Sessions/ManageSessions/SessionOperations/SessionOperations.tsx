import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import Error from '@/components/PopUps/Error/Error';
import Success from '@/components/PopUps/Success/Success';
import { validateSessionFields } from '@/Validations/validationsSessions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EditAppointmentProps {
  sessionId: string;
  isEditing?: boolean;
  isCreating?: boolean;
}

function SessionOperations({
  sessionId,
  isEditing,
  isCreating,
}: EditAppointmentProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showDltConfirmationSession, setShowDltConfirmationSession] =
    useState(false);
  const apiBaseUrl = 'http://34.220.171.214:9000/admin';

  const [sessionData, setSessionData] = useState({
    date: '',
    estimated_time: '',
    status: '',
    price: '',
    appointment_id: '',
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sessionId) {
          const response = await axios.get(
            `${apiBaseUrl}/sessions/${sessionId}`,
          );
          setSessionData({
            ...sessionData,
            date: response.data.date,
            estimated_time: response.data.estimated_time,
            status: response.data.status,
            price: response.data.price,
            appointment_id: response.data.appointment_id,
          });
        } else {
          setError('El identificador de la cita no se encontró');
        }
      } catch (error) {
        console.error(error);
        setError('No se pudo cargar la cita.');
      }
    };

    fetchData();
  }, [sessionId]);

  const editSessionMutation = useMutation(
    (newData) =>
      axios.patch(
        `https://handsomely-divine-abstracted-bed.deploy.space/sessions/${sessionId}`,
        newData,
      ),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['session', 'sessionId']);
      },
    },
  );

  const createSessionMutation = useMutation(
    (newSession) => axios.post(`${apiBaseUrl}/sessions`, newSession),
    {
      onSuccess: () => {
        console.log('Sesión creada con éxito');
        setSuccess('Sesión creada con éxito');
      },
    },
  );

  const clearSessionData = () => {
    setSessionData({
      date: '',
      estimated_time: '',
      status: '',
      price: '',
      appointment_id: '',
    });
  };

  const createSession = async () => {
    const fieldErrors = validateSessionFields(sessionData);
    try {
      if (!Object.keys(fieldErrors).length) {
        const sessionDataNumber = {
          ...sessionData,
          estimated_time: parseFloat(sessionData.estimated_time),
          price: parseFloat(sessionData.price),
        };
        console.log('Tratando de enviar: ', sessionDataNumber);
        const sessionResponse = await createSessionMutation.mutateAsync(
          sessionDataNumber as any,
        );
        const sessionId = sessionResponse.data.sessions.id;
        console.log(`Sesión creada con ID: ${sessionId}`);
        clearSessionData();
      } else {
        console.error('Algunos campos no están definidos o no son válidos');
        setError('Algunos campos no son válidos');
        for (const field in fieldErrors) {
          setError(fieldErrors[field]);
        }
        clearSessionData();
      }
    } catch (error) {
      console.error(error);
      setError('Ocurrió un error al intentar crear la sesión');
      clearSessionData();
    }
  };

  const handleEditSession = async () => {
    const fieldErrors = validateSessionFields(sessionData);

    try {
      //if (sessionData.id && !Object.keys(fieldErrors).length) {
      if (!Object.keys(fieldErrors).length) {
        await editSessionMutation.mutateAsync(sessionData as any);
        console.log('Sesión actualizada con éxito');
        setSuccess('Sesión actualizada con éxito');
        clearSessionData();
      } else {
        console.error('El campo id no está definido.');
        setError('Algunos campos no son válidos');
        for (const field in fieldErrors) {
          setError(fieldErrors[field]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSession = async () => {
    try {
      if (sessionId) {
        await axios.delete(
          `https://handsomely-divine-abstracted-bed.deploy.space/sessions/${sessionId}`,
        );
        console.log('Sesión eliminada con éxito');
        setSuccess('Sesión eliminada con éxito');
        clearSessionData();
      } else {
        setError('El identificador de la sesión no se encontró');
      }
    } catch (error) {
      console.error(error);
      setError('No se pudo eliminar la sesión.');
    } finally {
      setShowDltConfirmationSession(false);
    }
  };

  return (
    <div className={styles.edtDltContainer}>
      {error && <Error message={error} onClose={() => setError(null)} />}
      {success && (
        <Success message={success} onClose={() => setSuccess(null)} />
      )}
      <form>
        <div className={styles.formGroup}>
          <label className={styles.labelWithTitle} htmlFor="date">
            Fecha:
          </label>
          <DatePicker
            className={styles.inputDate}
            name="date"
            selected={sessionData.date ? new Date(sessionData.date) : null}
            showTimeSelect
            dateFormat="Pp"
            onChange={(date) => {
              if (date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
                setSessionData({ ...sessionData, date: formattedDate });
              }
            }}></DatePicker>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.timeStatusContainer}>
            <div>
              <label className={styles.labelWithTitle} htmlFor="estimated_time">
                Tiempo estimado:
              </label>
              <input
                className={styles.inputWithTitle}
                name="estimated_time"
                placeholder="Tiempo estimado en horas "
                value={sessionData.estimated_time}
                onChange={(e) =>
                  setSessionData({
                    ...sessionData,
                    estimated_time: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className={styles.labelWithTitle} htmlFor="status">
                Estado:
              </label>
              <select
                className={styles.inputWithTitle}
                name="status"
                placeholder="Estado"
                value={sessionData.status}
                onChange={(e) =>
                  setSessionData({ ...sessionData, status: e.target.value })
                }>
                <option value={'none'}>Seleccionar..</option>
                <option value={'pagado'}>Pagado</option>
                <option value="sin pagar">Sin pagar</option>
                <option value={'abonado'}>Abonado</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.labelWithTitle} htmlFor="price">
            Precio:
          </label>
          <input
            className={styles.inputWithTitle}
            name="price"
            placeholder="Precio del tatuaje"
            value={sessionData.price}
            onChange={(e) =>
              setSessionData({ ...sessionData, price: e.target.value })
            }
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.labelWithTitle} htmlFor="appointmentIdFk">
            Cita:
          </label>
          <input
            className={styles.inputWithTitle}
            name="appointmentIdFk"
            placeholder="Identificador de la cita"
            value={sessionData.appointment_id}
            onChange={(e) =>
              setSessionData({
                ...sessionData,
                appointment_id: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.buttonSession}>
          {isCreating ? (
            <>
              <center>
                <button
                  type={'button'}
                  className={styles.button}
                  data-action={'create-session'}
                  onClick={createSession}>
                  Agregar sesión
                </button>
              </center>
            </>
          ) : isEditing ? (
            <>
              <center>
                <button
                  type={'button'}
                  className={styles.button}
                  onClick={handleEditSession}>
                  Editar sesión
                </button>
              </center>
            </>
          ) : (
            <>
              <center>
                <button
                  type={'button'}
                  className={styles.buttonDelete}
                  onClick={() => {
                    setShowDltConfirmationSession(true);
                  }}>
                  Eliminar sesión
                </button>
              </center>
            </>
          )}
        </div>
      </form>
      {showDltConfirmationSession && (
        <div className={styles.confirmationBackdrop}>
          <div className={styles.confirmationPopup}>
            <p>¿Estás seguro de que deseas eliminar la sesión?</p>
            <button onClick={handleDeleteSession}>Eliminar</button>
            <button onClick={() => setShowDltConfirmationSession(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionOperations;
