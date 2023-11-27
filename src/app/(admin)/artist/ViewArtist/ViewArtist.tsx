'use client';
import styles from './styles.module.css';
import Image from 'next/image';
import { Input, Select, Button } from 'antd';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Modal } from 'antd';

interface UserType {
  name: string;
  email: string;
  id: string;
  instagram: string;
  description: string;
  phone: string;
  username: string;
}

function ViewArtist({
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

  const haveChanges = () => {
    return (
      user.email === editedUser.email &&
      user.name === editedUser.name &&
      user.phone === editedUser.phone
    );
  };

  const handleCancel = () => {
    setEditState(false);
    setEditedUser(user);
  };

  return (
    <div className={styles.container}>
      <Modal
        title="Eliminar artista"
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
          <Button type="primary" onClick={() => setDeleteUser(false)} danger>
            Cancelar
          </Button>
        </div>
      </Modal>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.editButton}
          onClick={() => setEditState(true)}>
          <Icon icon="ri:edit-line" />
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => setDeleteUser(true)}>
          <Icon icon="ri:delete-bin-2-line" />
        </button>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.name}>
            <p>Nombre</p>
            <Input
              defaultValue={editedUser.name}
              disabled={!editState}
              style={inputStyles}
              onChange={(e) => {
                setEditedUser({ ...editedUser, name: e.target.value });
              }}
            />
          </div>
          <div className={styles.mail}>
            <p>Correo electrónico</p>
            <Input
              defaultValue={editedUser.email}
              disabled={!editState}
              style={inputStyles}
              onChange={(e) => {
                setEditedUser({ ...editedUser, email: e.target.value });
              }}
            />
          </div>
          <div className={styles.description}>
            <p>Descripción</p>
            <Input
              defaultValue={editedUser.description}
              disabled={!editState}
              style={{ width: '640px', height: '100px' }}
            />
          </div>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.userName}>
            <p>Nombre de usuario</p>
            <Input
              defaultValue={editedUser.username}
              disabled={!editState}
              style={inputStyles}
            />
          </div>
          <div className={styles.categories}>
            <p>Categorías</p>
            <Select
              defaultValue={'Blackwork'}
              disabled={!editState}
              className="custom-select"
              style={inputStyles}
            />
          </div>
          <div className={styles.phone}>
            <p>Teléfono</p>
            <Input
              defaultValue={editedUser.phone}
              disabled={!editState}
              style={inputStyles}
              onChange={(e) => {
                setEditedUser({ ...editedUser, phone: e.target.value });
              }}
            />
          </div>
          <div className={styles.instagram}>
            <p>Instagram</p>
            <Input
              defaultValue={editedUser.instagram}
              disabled={!editState}
              style={inputStyles}
            />
          </div>
          {editState && (
            <div className={styles.saveButtonContainer}>
              <Button
                type="primary"
                disabled={haveChanges()}
                onClick={() => {
                  onSubmit(editedUser);
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
    </div>
  );
}

export default ViewArtist;
