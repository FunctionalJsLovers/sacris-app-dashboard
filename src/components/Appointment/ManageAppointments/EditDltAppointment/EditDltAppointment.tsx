import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import Error from '@/components/PopUps/Error/Error';
import Success from '@/components/PopUps/Success/Success';
import {
  validateSessionFields,
  validateAppointmentFields,
} from '@/Validations/validationsSessions';

interface EditAppointmentProps {
  appointmentId: string;
  isEditing?: boolean;
}

interface Artist {
  artistId: string;
  name: string;
  phone: string;
  email: string;
  adminIdFk: string;
}

interface Client {
  clientId: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
}

interface Category {
  categoryId: string;
  createdAt: string;
  name: string;
}

function EditDltAppointment({
  appointmentId,
  isEditing,
}: EditAppointmentProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDltConfirmationAppointment, setShowDltConfirmationAppointment] =
    useState(false);
  const [showDltConfirmationSession, setShowDltConfirmationSession] =
    useState(false);

  const [formData, setFormData] = useState({
    appointmentId: '',
    description: '',
    artistIdFk: '',
    clientIdFk: '',
    categoryIdFk: '',
  });

  const [sessionData, setSessionData] = useState({
    sessionId: '',
    date: '',
    estimatedTime: '',
    status: '',
    price: '',
    appointmentIdFk: '',
  });

  const queryClient = useQueryClient();
  const sessionId = sessionData.sessionId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (appointmentId) {
          const response = await axios.get(
            `https://handsomely-divine-abstracted-bed.deploy.space/appointments/${appointmentId}`,
          );

          const appointmentData = response.data;
          setFormData({
            ...formData,
            appointmentId: appointmentData.appointmentId,
            description: appointmentData.description,
            artistIdFk: appointmentData.artistIdFk,
            clientIdFk: appointmentData.clientIdFk,
            categoryIdFk: appointmentData.categoryIdFk,
          });

          setSessionData({
            ...sessionData,
            appointmentIdFk: appointmentData.appointmentId,
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
  }, [appointmentId]);

  const editAppointmentMutation = useMutation(
    (newData) =>
      axios.put(
        `https://handsomely-divine-abstracted-bed.deploy.space/appointments/${appointmentId}`,
        newData,
      ),
    {},
  );

  const editSessionMutation = useMutation(
    (newData) =>
      axios.put(
        `https://handsomely-divine-abstracted-bed.deploy.space/sessions/${sessionId}`,
        newData,
      ),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['session', 'sessionId']);
      },
    },
  );

  const handleEditAppointment = async () => {
    try {
      const fieldErrors = validateAppointmentFields(formData);
      if (
        formData.appointmentId &&
        formData.description &&
        !Object.keys(fieldErrors).length
      ) {
        await editAppointmentMutation.mutateAsync(formData as any);
        console.log('Cita actualizada con éxito');
        setSuccess('Cita actualizada con éxito');
        clearFormData();
      } else {
        console.error(
          'Algunos campos no se encuentran definidos o están sin seleccionar',
        );
        setError(
          'Algunos campos no se encuentran definidos o están sin seleccionar',
        );

        for (const field in fieldErrors) {
          setError(fieldErrors[field]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSession = async () => {
    const fieldErrors = validateSessionFields(sessionData);

    try {
      if (sessionData.sessionId && !Object.keys(fieldErrors).length) {
        await editSessionMutation.mutateAsync(sessionData as any);
        console.log('Sesión actualizada con éxito');
        setSuccess('Sesión actualizada con éxito');
        clearSessionData();
      } else if (!sessionData.sessionId) {
        setError('El campo de ID de Sesión es obligatorio.');
      } else {
        console.error('El campo sessionId no está definido.');
        setError('Algunos campos no son válidos');

        for (const field in fieldErrors) {
          setError(fieldErrors[field]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleIdAppointmentClick = async () => {
    try {
      if (formData.appointmentId) {
        const response = await axios.get(
          `https://handsomely-divine-abstracted-bed.deploy.space/appointments/${formData.appointmentId}`,
        );

        setFormData({
          ...formData,
          description: response.data.description,
          artistIdFk: response.data.artistIdFk,
          clientIdFk: response.data.clientIdFk,
          categoryIdFk: response.data.categoryIdFk,
        });
      } else {
        setError('No se encontró el identificador de cita.');
      }
    } catch (error) {
      console.error(error);
      setError('No se encontró el identificador de cita.');
    }
  };

  const handleIdSessionClick = async () => {
    try {
      if (sessionData.sessionId) {
        const response = await axios.get(
          `https://handsomely-divine-abstracted-bed.deploy.space/sessions/${sessionData.sessionId}`,
        );

        setSessionData({
          ...sessionData,
          date: response.data.date,
          estimatedTime: response.data.estimatedTime,
          status: response.data.status,
          price: response.data.price,
          appointmentIdFk: response.data.appointmentIdFk,
        });
      } else {
        setError('Algunos campos de sesión están vacíos o no son válidos');
      }
    } catch (error) {
      console.error(error);
      setError('No se encontró el identificador de sesión.');
    }
  };

  const handleDeleteAppointment = async () => {
    try {
      if (appointmentId) {
        await axios.delete(
          `https://handsomely-divine-abstracted-bed.deploy.space/appointments/${appointmentId}`,
        );
        console.log('Cita eliminada con éxito');
        setSuccess('Cita eliminada con éxito');
        clearFormData();
      } else {
        setError('El identificador de la cita no se encontró');
      }
    } catch (error) {
      console.error(error);
      setError('No se pudo eliminar la cita.');
    } finally {
      setShowDltConfirmationAppointment(false);
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
        clearFormData();
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
  const clearFormData = () => {
    setFormData({
      appointmentId: '',
      description: '',
      artistIdFk: '',
      clientIdFk: '',
      categoryIdFk: '',
    });
  };

  const clearSessionData = () => {
    setSessionData({
      sessionId: '',
      date: '',
      estimatedTime: '',
      status: '',
      price: '',
      appointmentIdFk: '',
    });
  };

  //Obtener los artistas
  useEffect(() => {
    axios
      .get(
        'https://handsomely-divine-abstracted-bed.deploy.space/artists/?totalCount=false',
      )
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.log('Error al cargar los artistas: ', error);
      });
  }, []);

  //Obtener los clients
  useEffect(() => {
    axios
      .get(
        'https://handsomely-divine-abstracted-bed.deploy.space/clients/?totalCount=false',
      )
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.log('Error al cargar los clientes: ', error);
      });
  }, []);

  //Obtener las categorías jejeje
  useEffect(() => {
    axios
      .get(
        'https://handsomely-divine-abstracted-bed.deploy.space/categories/?totalCount=false',
      )
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log('Error al cargar las categorías: ', error);
      });
  }, []);

  return (
    <div className={styles.containerEditAppointment}>
      {error && <Error message={error} onClose={() => setError(null)} />}
      {success && (
        <Success message={success} onClose={() => setSuccess(null)} />
      )}
      <center>
        <h1 className={styles.title}>Cita</h1>
      </center>
      <div className={styles.createSection}>
        <div className={styles.leftSection}>
          <h2>Cita</h2>
          <form>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="identifierApp">
                Identificador:
              </label>
              <div className={styles.idInput}>
                <input
                  className={styles.inputWithTitle}
                  name="appointmentId"
                  value={formData.appointmentId}
                  placeholder={'Identificador de la cita'}
                  onChange={(e) =>
                    setFormData({ ...formData, appointmentId: e.target.value })
                  }
                />
                <span
                  className={styles.showInfoAppointment}
                  onClick={handleIdAppointmentClick}></span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="description">
                Descripción:
              </label>
              <input
                className={styles.inputWithTitle}
                name="description"
                placeholder="Descripción de la cita"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="artist">
                Artista:
              </label>
              <select
                className={styles.inputWithTitle}
                placeholder={'Identificador del artista'}
                name="artistIdFk"
                value={formData.artistIdFk}
                onChange={(e) =>
                  setFormData({ ...formData, artistIdFk: e.target.value })
                }>
                <option value="">Seleccionar</option>
                {artists.map((artist) => (
                  <option key={artist.artistId} value={artist.artistId}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="client">
                Cliente:
              </label>
              <select
                className={styles.inputWithTitle}
                placeholder={'Identificador del cliente'}
                name="clientIdFk"
                value={formData.clientIdFk}
                onChange={(e) =>
                  setFormData({ ...formData, clientIdFk: e.target.value })
                }>
                <option value="">Seleccionar</option>
                {clients.map((client) => (
                  <option key={client.clientId} value={client.clientId}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="category">
                Categoría:
              </label>
              <select
                className={styles.inputWithTitle}
                placeholder={'Identificador de la categoría'}
                name="categoryIdFk"
                value={formData.categoryIdFk}
                onChange={(e) =>
                  setFormData({ ...formData, categoryIdFk: e.target.value })
                }>
                <option value="">Seleccionar</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.buttonAppointment}>
              {isEditing ? (
                <>
                  <center>
                    <button
                      type={'button'}
                      className={styles.button}
                      onClick={handleEditAppointment}>
                      Editar cita
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
                        setShowDltConfirmationAppointment(true);
                      }}>
                      Eliminar cita
                    </button>
                  </center>
                </>
              )}
            </div>
          </form>
        </div>
        <div className={styles.rightSection}>
          <h2>Sesión</h2>
          <form>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="identifierSess">
                Identificador:
              </label>
              <div className={styles.idInput}>
                <input
                  className={styles.inputWithTitle}
                  name="sessionId"
                  value={sessionData.sessionId}
                  placeholder={'Identificador de la sesión'}
                  onChange={(e) =>
                    setSessionData({
                      ...sessionData,
                      sessionId: e.target.value,
                    })
                  }
                />
                <span
                  className={styles.showInfoSession}
                  onClick={handleIdSessionClick}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="date">
                Fecha:
              </label>
              <input
                className={styles.inputWithTitle}
                name="date"
                placeholder="Fecha y hora de la cita"
                value={sessionData.date}
                onChange={(e) =>
                  setSessionData({ ...sessionData, date: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.timeStatusContainer}>
                <div>
                  <label
                    className={styles.labelWithTitle}
                    htmlFor="estimatedTime">
                    Tiempo estimado:
                  </label>
                  <input
                    className={styles.inputWithTitle}
                    name="estimatedTime"
                    placeholder="Tiempo estimado en horas "
                    value={sessionData.estimatedTime}
                    onChange={(e) =>
                      setSessionData({
                        ...sessionData,
                        estimatedTime: e.target.value,
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
              <label
                className={styles.labelWithTitle}
                htmlFor="appointmentIdFk">
                Cita:
              </label>
              <input
                className={styles.inputWithTitle}
                name="appointmentIdFk"
                placeholder="Identificador de la cita"
                value={sessionData.appointmentIdFk}
                onChange={(e) =>
                  setSessionData({
                    ...sessionData,
                    appointmentIdFk: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.buttonSession}>
              {isEditing ? (
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
        </div>
      </div>
      {showDltConfirmationAppointment && (
        <div className={styles.confirmationBackdrop}>
          <div className={styles.confirmationPopup}>
            <p>¿Estás seguro de que deseas eliminar la cita?</p>
            <button onClick={handleDeleteAppointment}>Eliminar</button>
            <button onClick={() => setShowDltConfirmationAppointment(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      {showDltConfirmationSession && (
        <div className={styles.confirmationPopup}>
          <p>¿Estás seguro de que deseas eliminar la sesión?</p>
          <button onClick={handleDeleteSession}>Eliminar</button>
          <button onClick={() => setShowDltConfirmationSession(false)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default EditDltAppointment;
