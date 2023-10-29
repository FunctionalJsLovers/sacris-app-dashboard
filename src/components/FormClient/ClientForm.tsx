'use client';
import { useState } from 'react';
import styles from './Form.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { createClient } from '@/services/ClientAPI';
import { uploadFile } from '@/services/Storage';
import { Modal } from 'antd';
function CustomForm() {
  const [cancelButtonVisible, setCancelButtonVisible] = useState(true);
  const {
    mutate: addUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createClient,
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
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = handleSubmit((client) => {
    addUser(client);
    reset();
    setCancelButtonVisible(false);
    console.log(client);
  });

  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <div className={styles.formRight}>
        <div className={styles.div}>
          <div className={styles.label}>Mail</div>
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
          <div className={styles.label}>Nombre</div>
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
          <div className={styles.label}>Teléfono</div>
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
        <div className={styles.formButtons}>
          {cancelButtonVisible && (
            <button className={styles.confirmButton} onSubmit={onSubmit}>
              Confirmar
            </button>
          )}
          <Link href="/clients">
            {' '}
            {cancelButtonVisible && (
              <button className={styles.cancelButton}>Cancelar</button>
            )}{' '}
          </Link>
        </div>
        {isLoading && <h1>creando...</h1>}

        {isError && (
          <Modal open={true} footer={null} width={260} style={{ height: 400 }}>
            <div className={styles.msg}>
              <h1 className={styles.label}> Ya Existe Cliente </h1>
              <Link href="/clients">
                <button className={styles.menuButton}>Volver</button>
                <h1 className={styles.label}></h1>
              </Link>
            </div>
          </Modal>
        )}

        {isSuccess && (
          <Modal open={true} footer={null} width={260} style={{ height: 400 }}>
            <div className={styles.msg}>
              <h1 className={styles.label}>Cliente Creado</h1>
              <Link href="/clients">
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
