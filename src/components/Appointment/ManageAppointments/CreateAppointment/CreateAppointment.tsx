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
  id: string;
  name: string;
  phone: string;
  email: string;
  admin_id: string;
  description: string;
  instagram: string;
  username: string;
}

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface Category {
  id: string;
  name: string;
}

const CreateAppointment = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const apiBaseUrl = 'http://34.220.171.214:9000/admin';

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/artists`);
      setArtists(response.data.artists);
    } catch (error) {
      console.error('Error al cargar los artistas:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/clients`);
      setClients(response.data.clients);
    } catch (error) {
      console.error('Error al cargar los clientes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  };

  useEffect(() => {
    fetchArtists();
    fetchClients();
    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    description: '',
    artist_id: '',
    client_id: '',
    category_id: '',
  });

  const createAppointmentMutation = useMutation(
    (newAppointment) =>
      axios.post(`${apiBaseUrl}/appointments`, newAppointment),
    {
      onSuccess: () => {
        console.log('Cita creada con éxito');
        setSuccess('Cita creada con éxito');
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

  const createAppointment = async () => {
    try {
      const fieldErrors = validateAppointmentFields(formData);
      console.log('Datos: ', formData);
      if (formData.description && !Object.keys(fieldErrors).length) {
        const appointmentResponse = await createAppointmentMutation.mutateAsync(
          formData as any,
        );
        const appointmentId = appointmentResponse.data.id;
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

  const clearFormData = () => {
    setFormData({
      description: '',
      artist_id: '',
      client_id: '',
      category_id: '',
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.containerCreateAppointment}>
      {error && <Error message={error} onClose={() => setError(null)} />}
      {success && (
        <Success message={success} onClose={() => setSuccess(null)} />
      )}
      <center>
        <h1 className={styles.title}>Crear cita</h1>
      </center>
      <form onSubmit={createAppointment}>
        <div className={styles.createSection}>
          <div className={styles.leftSection}>
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
              <label className={styles.labelWithTitle} htmlFor="client">
                Cliente:
              </label>
              <select
                className={styles.inputWithTitle}
                placeholder={'Identificador del cliente'}
                name="client_id"
                value={formData.client_id}
                onChange={handleSelectChange}>
                <option value="">Seleccionar</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
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
                name="category_id"
                value={formData.category_id}
                onChange={handleSelectChange}>
                <option value="">Seleccionar</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="name">
                Nombre:
              </label>
              <input
                className={styles.inputWithTitle}
                name="name"
                placeholder="Nombre"
                //value={}
                //onChange={handleAppointmentChange}
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
                  name="artist_id"
                  value={formData.artist_id}
                  onChange={handleSelectChange}>
                  <option value="">Seleccionar</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
                <span className={styles.iconPencil}></span>
              </div>
            </div>
          </div>
        </div>
        <center>
          <button
            type={'button'}
            className={styles.button}
            onClick={createAppointment}>
            Agregar cita
          </button>
        </center>
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
      </form>
    </div>
  );
};

export default CreateAppointment;
