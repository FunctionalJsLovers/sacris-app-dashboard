import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useMutation } from 'react-query';
import axios from 'axios';
import Error from '@/components/PopUps/Error/Error';
import Success from '@/components/PopUps/Success/Success';
import { validateAppointmentFields } from '@/Validations/validationsSessions';

interface EditAppointmentProps {
  appointment_id: string;
  isEditing?: boolean;
  refetchAppointments?: () => void;
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

function EditDltAppointment({
  appointment_id,
  isEditing,
  refetchAppointments,
}: EditAppointmentProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDltConfirmationAppointment, setShowDltConfirmationAppointment] =
    useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [formData, setFormData] = useState({
    id: '',
    description: '',
    artist_id: '',
    client_id: '',
    category_id: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (appointment_id) {
          const response = await axios.get(
            `${apiBaseUrl}/admin/appointments/${appointment_id}`,
          );
          const appointmentData = response.data.appointments[0];
          setFormData({
            ...formData,
            id: appointmentData.id,
            description: appointmentData.description,
            artist_id: appointmentData.artist_id,
            client_id: appointmentData.client_id,
            category_id: appointmentData.category_id,
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
  }, [appointment_id]);

  const editAppointmentMutation = useMutation(
    (newData) =>
      axios.patch(
        `${apiBaseUrl}/admin/appointments/${appointment_id}`,
        newData,
      ),
    {},
  );

  const handleEditAppointment = async () => {
    try {
      const fieldErrors = validateAppointmentFields(formData);
      if (!Object.keys(fieldErrors).length) {
        const editAppointmentData = {
          appointment: {
            description: formData.description,
          },
        };
        await editAppointmentMutation.mutateAsync(editAppointmentData as any);
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

  const handleDeleteAppointment = async () => {
    try {
      if (appointment_id) {
        await axios.delete(
          `${apiBaseUrl}/admin/appointments/${appointment_id}`,
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

  const clearFormData = () => {
    setFormData({
      id: '',
      description: '',
      artist_id: '',
      client_id: '',
      category_id: '',
    });
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
  }, []);

  return (
    <div className={styles.containerEditAppointment}>
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
        <h1 className={styles.title}>Cita</h1>
      </center>
      <form>
        <div className={styles.createSection}>
          <div className={styles.leftSection}>
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="artist">
                Artista:
              </label>
              <select
                className={styles.inputWithTitle}
                placeholder={'Identificador del artista'}
                name="artist_id"
                value={formData.artist_id}
                onChange={(e) =>
                  setFormData({ ...formData, artist_id: e.target.value })
                }>
                <option value="">Seleccionar</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
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
                name="client_id"
                value={formData.client_id}
                onChange={(e) =>
                  setFormData({ ...formData, client_id: e.target.value })
                }>
                <option value="">Seleccionar</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.rightSection}>
            {/* Espacio para meter la cita
            <div className={styles.formGroup}>
              <label className={styles.labelWithTitle} htmlFor="name">
                Nombre:
              </label>
              <input
                className={styles.inputWithTitle}
                name="name"
                placeholder="Nombre característico de la cita"
                //value={formData.description}
              />
            </div>*/}
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
              <label className={styles.labelWithTitle} htmlFor="category">
                Categoría:
              </label>
              <select
                className={styles.inputWithTitle}
                placeholder={'Identificador de la categoría'}
                name="category_id"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }>
                <option value="">Seleccionar</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
    </div>
  );
}

export default EditDltAppointment;
