'use client';
import {
  RiUserAddLine,
  RiEditLine,
  RiDeleteBin2Line,
  RiSearchLine,
} from 'react-icons/ri';
import styles from './page.module.css';
import ClientList from '../ClientList/clientList';
import Link from 'next/link';
import { useState } from 'react';
import ViewClient from '@/app/(admin)/clients/ViewClient/ViewClient';
import { Modal } from 'antd';
import { useMutation } from 'react-query';
import { editClient, deleteClient } from '@/services/ClientApi';

interface UserType {
  name: string;
  email: string;
  id: string;
  phone: string;
}

function Client() {
  const [selectedClient, setSelectedClient] = useState<UserType>();
  const [viewClientState, setViewClientState] = useState<boolean>(false);

  const handleUserSelect = (user: UserType) => {
    setSelectedClient(user);
    setViewClientState(true);
  };

  const { mutate: editUser } = useMutation({
    mutationFn: editClient,
    onSuccess: async () => {
      setViewClientState(false);
      console.log('success');
    },
    onError: async () => {
      console.log('error');
    },
  });

  const onSubmit = (editedUser: UserType) => {
    editUser(editedUser);
  };

  const onDelete = async (userId: string) => {
    const response = await deleteClient(userId);
    if (response === true) {
      setViewClientState(false);
    }
  };

  return (
    <>
      <div className={styles.all}>
        <Modal
          title="Cliente"
          open={viewClientState}
          onCancel={() => setViewClientState(false)}
          width={700}
          footer={null}>
          {selectedClient && (
            <ViewClient
              user={selectedClient}
              key={selectedClient.id}
              onSubmit={onSubmit}
              onDelete={onDelete}
            />
          )}
        </Modal>
        <div className={styles.main}>
          <div className={styles.inputContainer}>
            <RiSearchLine className={styles.searchIcon} />
            <input
              className={styles.inputField}
              type="text"
              placeholder="Type here..."
            />
          </div>
          <div className={styles.buttonContainer}>
            <Link href="./clients/new">
              {' '}
              <button>
                <RiUserAddLine className={styles.icons} color="black" />
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.artist}>
          <h1 className={styles.h1}>Lista de Clientes</h1> <br />
          <div className={styles.header_row}>
            <div className={styles.header_a}>CLIENTE</div>
            <div className={styles.tags}>
              <div className={styles.profile}>PERFIL</div>
            </div>
          </div>
          <div className={styles.back}>
            <ClientList
              onUserSelect={(client) => handleUserSelect(client)}></ClientList>
          </div>
        </div>
      </div>
    </>
  );
}

export default Client;
