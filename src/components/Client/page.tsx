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
import ViewArtist from '@/app/(admin)/artist/ViewArtist/ViewArtist';
import { Modal } from 'antd';
import { useMutation } from 'react-query';
import { editArtist, deleteArtist } from '@/services/ArtistsAPI';

interface UserType {
  name: string;
  email: string;
  id: string;
  phone: string;
}

function Client() {
  const [selectedArtist, setSelectedArtist] = useState<UserType>();
  const [viewArtistState, setViewArtistState] = useState<boolean>(false);

  const handleUserSelect = (user: UserType) => {
    setSelectedArtist(user);
    setViewArtistState(true);
  };

  return (
    <>
      <div className={styles.all}>
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
