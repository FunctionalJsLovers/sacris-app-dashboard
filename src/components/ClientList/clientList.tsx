'use client';
import {
  RiFileUserLine,
  RiInboxLine,
  RiCalendarTodoLine,
  RiExternalLinkLine,
} from 'react-icons/ri';
import styles from './client.module.css';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getAllClients } from '../../services/ClientApi';
import { useState } from 'react';

interface UserType {
  name: string;
  email: string;
  id: string;
  phone: string;
}

function ClientList({
  onUserSelect,
}: {
  onUserSelect: (user: UserType) => void;
}) {
  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: getAllClients,
    refetchOnWindowFocus: false,
  });

  const handleEditIconClick = (user: UserType) => {
    if (user) {
      onUserSelect(user);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.artistContainer}>
        {clients?.clients?.map((client: any) => (
          <div className={styles.card} key={client.id}>
            <div className={styles.carddetails}>
              <div className={styles.name}>
                <h1>{client.name} </h1>
                <h3>{client.email}</h3>
              </div>
            </div>
            <div className={styles.cardicons}>
              <RiFileUserLine
                className={styles.edit_icon}
                title="Editar Perfil"
                onClick={() => {
                  handleEditIconClick(client);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientList;
