'use client';
import styles from './styles.module.css';
import { Input, Select, Button } from 'antd';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Modal } from 'antd';

interface UserType {
  name: string;
  email: string;
  id: string;
  phone: string;
}

function ViewClient({
  user,
  onSubmit,
  onDelete,
}: {
  user: UserType;
  onSubmit: (editedUser: UserType) => void;
  onDelete: (userId: string) => void;
}) {
  const inputStyles = {
    width: '640px',
    height: '40px',
    borderRadius: '5px',
    fontSize: '14px',
  };

  const [editState, setEditState] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState(user);
  const [deleteUser, setDeleteUser] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const haveChanges = () => {
    return (
      Object.values(errors).every((errorMessage) => errorMessage === '') &&
      user.email === editedUser.email &&
      user.name === editedUser.name &&
      user.phone === editedUser.phone
    );
  };

  const handleCancel = () => {
    setEditState(false);
    setEditedUser(user);
  };

  function validateName(name: string) {
    if (name === '') {
      return 'El nombre es requerido';
    }
    if (/[0-9]/.test(name)) {
      return 'El nombre no debe contener números';
    }
    return '';
  }

  function validateEmail(email: string) {
    if (email === '') {
      return 'El correo electrónico es requerido';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return 'Por favor, introduce un correo electrónico válido';
    }
    return '';
  }

  function validatePhone(phone: string) {
    if (phone === '') {
      return 'El teléfono es requerido';
    }
    if (!/^[0-9]+$/.test(phone)) {
      return 'El teléfono debe contener sólo números';
    }
    return '';
  }

  return (
    <div className={styles.container}>
      <Modal
        title="Eliminar cliente"
        open={deleteUser}
        onCancel={() => setDeleteUser(false)}
        width={400}
        footer={null}>
        <div className={styles.saveButtonContainer}>
          <Button
            type="primary"
            onClick={() => {
              onDelete(user.id);
              setDeleteUser(false);
            }}>
            Confirmar
          </Button>
          <Button type="primary" danger onClick={() => setDeleteUser(false)}>
            Cancelar
          </Button>
        </div>
      </Modal>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.editButton}
          onClick={() => setEditState(true)}>
          <Icon icon="akar-icons:edit" />
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => setDeleteUser(true)}>
          <Icon icon="akar-icons:trash-can" />
        </button>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.name}>
          <p>Nombre</p>
          <Input
            defaultValue={editedUser.name}
            disabled={!editState}
            style={inputStyles}
            onChange={(e) => {
              const errorMessage = validateName(e.target.value);
              setErrors({ ...errors, name: errorMessage });
              setEditedUser({ ...editedUser, name: e.target.value });
            }}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>
        <div className={styles.phone}>
          <p>Teléfono</p>
          <Input
            defaultValue={editedUser.phone}
            disabled={!editState}
            style={inputStyles}
            onChange={(e) => {
              const errorMessage = validatePhone(e.target.value);
              setErrors({ ...errors, phone: errorMessage });
              setEditedUser({ ...editedUser, phone: e.target.value });
            }}
          />
          {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
        </div>
        <div className={styles.mail}>
          <p>Correo electrónico</p>
          <Input
            defaultValue={editedUser.email}
            disabled={!editState}
            style={inputStyles}
            onChange={(e) => {
              const errorMessage = validateEmail(e.target.value);
              setErrors({ ...errors, email: errorMessage });
              setEditedUser({ ...editedUser, email: e.target.value });
            }}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>
        {editState && (
          <div className={styles.saveButtonContainer}>
            <Button
              type="primary"
              disabled={
                Object.values(errors).some(
                  (errorMessage) => errorMessage !== '',
                ) || haveChanges()
              }
              onClick={() => {
                onSubmit(editedUser);
                setEditState(false);
              }}>
              Guardar
            </Button>
            <Button type="primary" onClick={() => handleCancel()} danger>
              Cancelar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewClient;
