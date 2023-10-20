'use client';
import { useState } from 'react';
import styles from './Form.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { createArtist } from '@/services/ArtistsAPI';
import { uploadFile } from '@/services/Storage';
import { Modal } from 'antd';
function CustomForm() {
  const [cancelButtonVisible, setCancelButtonVisible] = useState(true);
  const [errorQuery, setErrorQuery] = useState(true);

  const [file, setFile] = useState(null);

  const [artist, setArtist] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const {
    mutate: addUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createArtist,
    onSuccess: async () => {
      console.log('success');
    },
    onError: async (error) => {
      console.log('error', error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      admin_id: 'e694203f-1f9d-42df-8f8f-bbfa03a05555',
      description: '',
      instagram: '',
      username: '',
    },
  });

  const onSubmit = handleSubmit((artist) => {
    addUser(artist);
    reset();
    setCancelButtonVisible(false);
    console.log(artist);
    uploadFile(artist.phone, file);
    setFile(null);
  });

  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <div className={styles.formLeft}>
        <div className={styles.img}>
          {' '}
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              width={250}
              height={250}
              alt={''}
            />
          )}
        </div>
        <input
          type="file"
          name="image"
          accept="image"
          className={styles.inputImage}
          onChange={(e: any) => {
            setFile(e.target.files[0]);
          }}
        />
        <div className={styles.div}>
          <label className={styles.label} htmlFor="email">
            Mail
          </label>
          <br />
          <input
            type="email"
            className={styles.input}
            {...register('email', {
              required: {
                value: true,
                message: 'Correo es requerido',
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Correo no válido',
              },
            })}
          />
          {errors.email && (
            <span className={styles.span}> {errors.email.message} </span>
          )}
        </div>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="description">
            Descripción
          </label>
          <textarea
            className={styles.textarea}
            {...register('description', {
              required: {
                value: true,
                message: 'Descripcion es requerida',
              },

              pattern: {
                value: /^(?!\s)[A-Za-z0-9\s]+$/,
                message: 'descripcion no válida',
              },
              maxLength: 150,
              minLength: 2,
            })}
          />
          {errors.description && (
            <span className={styles.span}> {errors.description.message} </span>
          )}
          {errors.description?.type === 'maxLength' && (
            <span className={styles.span}>
              Descripcion no debe ser mayor a 150 caracteres
            </span>
          )}
          {errors.description?.type === 'minLength' && (
            <span className={styles.span}>
              Descripcion debe ser mayor a 2 caracteres
            </span>
          )}
        </div>
      </div>
      <div className={styles.formRight}>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            className={styles.input}
            {...register('name', {
              required: {
                value: true,
                message: 'Nombre es requerido',
              },

              pattern: {
                value: /^(?!\s)[A-Za-z\s]+$/,
                message: 'nombre no válido',
              },
              maxLength: 20,
              minLength: 2,
            })}
          />
          {errors.name && (
            <span className={styles.span}> {errors.name.message} </span>
          )}
          {errors.name?.type === 'maxLength' && (
            <span className={styles.span}>
              Nombre no debe ser mayor a 20 caracteres
            </span>
          )}
          {errors.name?.type === 'minLength' && (
            <span className={styles.span}>
              Nombre debe ser mayor a 2 caracteres
            </span>
          )}
        </div>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="username">
            User Name
          </label>
          <input
            type="text"
            className={styles.input}
            {...register('username', {
              required: {
                value: true,
                message: 'User Name es requerida',
              },

              pattern: {
                value: /^(?!\s)[A-Za-z0-9\s]+$/,
                message: 'User Name no válida',
              },
              maxLength: 15,
              minLength: 2,
            })}
          />
          {errors.username && (
            <span className={styles.span}> {errors.username.message} </span>
          )}
          {errors.username?.type === 'maxLength' && (
            <span className={styles.span}>
              User Name no debe ser mayor a 15 caracteres
            </span>
          )}
          {errors.username?.type === 'minLength' && (
            <span className={styles.span}>
              User Name debe ser mayor a 2 caracteres
            </span>
          )}
        </div>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="categories">
            Categorías
          </label>
          <input type="text" name="categories" className={styles.input} />
        </div>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="phone">
            Teléfono
          </label>
          <input
            type="text"
            className={styles.input}
            {...register('phone', {
              required: {
                value: true,
                message: 'Telefono es requerido',
              },
              pattern: {
                value: /^(\d+|\d*\.\d+)$/,
                message: 'telefono no válido',
              },
              maxLength: 10,
              minLength: 2,
            })}
          />
          {errors.phone && (
            <span className={styles.span}> {errors.phone.message} </span>
          )}
          {errors.phone?.type === 'maxLength' && (
            <span className={styles.span}>
              Teléfono no debe ser mayor a 10 caracteres
            </span>
          )}
          {errors.phone?.type === 'minLength' && (
            <span className={styles.span}>
              Teléfono debe ser mayor a 2 caracteres
            </span>
          )}
        </div>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="instagram">
            Instagram
          </label>
          <input
            type="text"
            className={styles.input}
            {...register('instagram', {
              required: {
                value: true,
                message: 'Instagram es requerido',
              },

              pattern: {
                value: /^(?!\s)[A-Za-z0-9\s]+$/,
                message: 'Instagram no válido',
              },
              minLength: 2,
            })}
          />
          {errors.instagram && (
            <span className={styles.span}> {errors.instagram.message} </span>
          )}
          {errors.instagram?.type === 'minLength' && (
            <span className={styles.span}>
              Instagram debe ser mayor a 2 caracteres
            </span>
          )}
        </div>
        <div className={styles.formButtons}>
          {cancelButtonVisible && (
            <button className={styles.confirmButton} onSubmit={onSubmit}>
              Confirmar
            </button>
          )}
          <Link href="/artist">
            {' '}
            {cancelButtonVisible && (
              <button className={styles.cancelButton}>Cancelar</button>
            )}{' '}
          </Link>
        </div>
        {isLoading && <h1>creando...</h1>}

        {isError && (
          <Modal open={true} footer={null} width={250} style={{ height: 400 }}>
            <div className={styles.msg}>
              <h1 className={styles.label}>Artista creado</h1>
              <Link href="/artist">
                <button className={styles.menuButton}>Volver</button>
                <h1 className={styles.label}></h1>
              </Link>
            </div>
          </Modal>
        )}

        {isSuccess && (
          <Modal open={true} footer={null} width={250} style={{ height: 400 }}>
            <div className={styles.msg}>
              <h1 className={styles.label}>Artista creado</h1>
              <Link href="/artist">
                <button className={styles.menuButton}>Volver</button>
              </Link>
            </div>
          </Modal>
        )}
      </div>
    </form>
  );
}

export default CustomForm;
