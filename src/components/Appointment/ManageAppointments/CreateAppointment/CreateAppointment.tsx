import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useMutation } from 'react-query';
import axios from 'axios';
import Error from '@/components/PopUps/Error/Error';
import Success from '@/components/PopUps/Success/Success';
import {
  validateSessionFields,
  validateAppointmentFields,
} from '@/Validations/validationsSessions';

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

const CreateAppointment = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    description: '',
    artistIdFk: '',
    clientIdFk: '',
    categoryIdFk: '',
  });

  const [sessionData, setSessionData] = useState({
    date: '',
    estimatedTime: '',
    status: '',
    price: '',
    appointmentIdFk: '',
  });

  const createAppointmentMutation = useMutation(
    (newAppointment) =>
      axios.post(
        'https://handsomely-divine-abstracted-bed.deploy.space/appointments/',
        newAppointment,
      ),
    {
      onSuccess: () => {
        console.log('Cita creada con éxito');
        setSuccess('Cita creada con éxito');
      },
    },
  );

  const createSessionMutation = useMutation(
    (newSession) =>
      axios.post(
        'https://handsomely-divine-abstracted-bed.deploy.space/sessions/',
        newSession,
      ),
    {
      onSuccess: () => {
        console.log('Sesión creada con éxito');
        setSuccess('Sesión creada con éxito');
      },
    },
  );

  const handleAppointmentChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSessionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSessionData((prevSessionData) => ({
      ...prevSessionData,
      [name]: value,
    }));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSessionData((prevSessionData) => ({
      ...prevSessionData,
      [name]: value,
    }));
  };

  const createAppointment = async () => {
    try {
      const fieldErrors = validateAppointmentFields(formData);
      if (formData.description && !Object.keys(fieldErrors).length) {
        const appointmentResponse = await createAppointmentMutation.mutateAsync(
          formData as any,
        );
        const appointmentId = appointmentResponse.data.appointmentId;
        console.log(`Cita creada con ID: ${appointmentId}`);
        setSuccessMessage(`Cita creada con ID: ${appointmentId}`);
        clearFormData();
      } else {
        console.error('Algunos datos no están definidos o no son válidos.');
        setError(
          'Algunos campos no se encuentran definidos o están sin seleccionar',
        );

        for (const field in fieldErrors) {
          setError(fieldErrors[field]);
        }
      }
    } catch (error) {
      console.error(error);
      setError('Ocurrió un error al intentar crear la cita');
    }
  };

  const createSession = async () => {
    const fieldErrors = validateSessionFields(sessionData);

    try {
      if (!Object.keys(fieldErrors).length) {
        const sessionResponse = await createSessionMutation.mutateAsync(
          sessionData as any,
        );
        const sessionId = sessionResponse.data.sessionId;
        console.log(`Sesión creada con ID: ${sessionId}`);
        clearSessionData();
      } else {
        console.error('Algunos campos no están definidos o no son válidos');
        setError('Algunos campos no son válidos');

        for (const field in fieldErrors) {
          setError(fieldErrors[field]);
        }
      }
    } catch (error) {
      console.error(error);
      setError('Ocurrió un error al intentar crear la sesión');
    }
  };

  const clearFormData = () => {
    setFormData({
      description: '',
      artistIdFk: '',
      clientIdFk: '',
      categoryIdFk: '',
    });
  };

  const clearSessionData = () => {
    setSessionData({
      date: '',
      estimatedTime: '',
      status: '',
      price: '',
      appointmentIdFk: '',
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
    <div className={styles.containerCreateAppointment}>
      {error && <Error message={error} onClose={() => setError(null)} />}
      {success && (
        <Success message={success} onClose={() => setSuccess(null)} />
      )}
      <center>
        <h1 className={styles.title}>Crear cita</h1>
      </center>
      <div className={styles.createSection}>
        <div className={styles.leftSection}>
          <h2>Cita</h2>
          <form onSubmit={createAppointment}>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="description">
                Descripción:
              </label>
              <input
                className={styles.inputWithTitle}
                name="description"
                placeholder="Descripción de la cita"
                value={formData.description}
                onChange={handleAppointmentChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="artist">
                Artista:
              </label>
              <div className={styles.inputArtist}>
                <select
                  className={styles.inputWithTitle}
                  placeholder={'Identificador del artista'}
                  name="artistIdFk"
                  value={formData.artistIdFk}
                  onChange={handleSelectChange}>
                  <option value="">Seleccionar</option>
                  {artists.map((artist) => (
                    <option key={artist.artistId} value={artist.artistId}>
                      {artist.name}
                    </option>
                  ))}
                </select>
                <span className={styles.iconPencil}></span>
              </div>
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
                onChange={handleSelectChange}>
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
                onChange={handleSelectChange}>
                <option value="">Seleccionar</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <center>
              <button
                type={'button'}
                className={styles.button}
                onClick={createAppointment}>
                Agregar cita
              </button>
            </center>
          </form>
          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}
        </div>
        <div className={styles.rightSection}>
          <h2>Sesión</h2>
          <form onSubmit={createSession}>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="date">
                Fecha:
              </label>
              <input
                className={styles.inputWithTitle}
                name="date"
                placeholder="Fecha y hora de la cita"
                value={sessionData.date}
                onChange={handleSessionChange}
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
                    placeholder="Tiempo estimado en minutos"
                    value={sessionData.estimatedTime}
                    onChange={handleSessionChange}
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
                    onChange={handleStatusChange}>
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
                onChange={handleSessionChange}
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
                onChange={handleSessionChange}
              />
            </div>
            <center>
              <button
                type={'button'}
                className={styles.button}
                data-action={'create-session'}
                onClick={createSession}>
                Agregar sesión
              </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
