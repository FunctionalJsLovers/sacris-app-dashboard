import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useMutation } from 'react-query';
import axios from 'axios';
import Error from '@/components/PopUps/Error/Error';
import Success from '@/components/PopUps/Success/Success';
import { validateAppointmentFields } from '@/Validations/validationsSessions';

interface CreateAppointmentProps {
  refetchAppointments?: () => void;
}

interface ArtistCategory {
  id: string;
  artist_id: string;
  category_id: string;
}
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

const CreateAppointment = ({ refetchAppointments }: CreateAppointmentProps) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [artistCategories, setArtistCategories] = useState<ArtistCategory[]>(
    [],
  );
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchArtistCategories = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/artistCategories`);
      setArtistCategories(response.data.artistCategories);
    } catch (error) {
      console.error('Error al cargar las categorías de los artistas:', error);
    }
  };
  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/artists`);
      setArtists(response.data.artists);
    } catch (error) {
      console.error('Error al cargar los artistas:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/clients`);
      setClients(response.data.clients);
    } catch (error) {
      console.error('Error al cargar los clientes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  };

  useEffect(() => {
    fetchArtists();
    fetchClients();
    fetchCategories();
    fetchArtistCategories();
  }, []);

  const [formData, setFormData] = useState({
    description: '',
    artist_id: '',
    client_id: '',
    category_id: '',
  });

  const createAppointmentMutation = useMutation(
    (newAppointment) =>
      axios.post(`${apiBaseUrl}/admin/appointments`, newAppointment),
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

  const clearFormData = () => {
    setFormData({
      description: '',
      artist_id: '',
      client_id: '',
      category_id: '',
    });
  };
  const createAppointment = async () => {
    try {
      const fieldErrors = validateAppointmentFields(formData);
      console.log('Datos: ', formData);
      if (formData.description && !Object.keys(fieldErrors).length) {
        const newAppointment = { appointment: formData };
        const appointmentResponse = await createAppointmentMutation.mutateAsync(
          newAppointment as any,
        );
        const appointmentId = appointmentResponse.data.appointments[0].id;
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
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.containerCreateAppointment}>
      {error && (
        <Error
          message={error}
          onClose={() => setError(null)}
          refetch={refetchAppointments}
        />
      )}
      {success && (
        <Success
          message={success}
          onClose={() => setSuccess(null)}
          refetch={refetchAppointments}
        />
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
                {artistCategories.map((artistCategory) => {
                  const category = categories.find(
                    (c) => c.id === artistCategory.category_id,
                  );
                  return (
                    <option key={artistCategory.id} value={artistCategory.id}>
                      {category ? category.name : 'Categoría no encontrada'}
                    </option>
                  );
                })}
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
      </form>
    </div>
  );
};

export default CreateAppointment;
