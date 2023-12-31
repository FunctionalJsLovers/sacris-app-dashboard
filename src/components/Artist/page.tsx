'use client';
import { RiUserAddLine, RiSearchLine } from 'react-icons/ri';
import styles from './page.module.css';
import ArtistList from './artistList';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ViewArtist from '@/app/(admin)/artist/ViewArtist/ViewArtist';
import { Modal } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { editArtist, deleteArtist } from '@/services/ArtistsAPI';
import { getAllArtists } from '../../services/ArtistsAPI';

interface UserType {
  name: string;
  email: string;
  id: string;
  phone: string;
  instagram: string;
  description: string;
  username: string;
}

function Artist() {
  const [selectedArtist, setSelectedArtist] = useState<UserType>();
  const [viewArtistState, setViewArtistState] = useState<boolean>(false);
  const [modalAlert, setModalAlert] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleUserSelect = (user: UserType) => {
    setSelectedArtist(user);
    setViewArtistState(true);
  };

  const handleDataUpdate = () => {
    setViewArtistState(false);
    setModalAlert(true);
    setModalText('El artista se ha editado correctamente');
    refetch();
  };

  const { mutate: editUser } = useMutation({
    mutationFn: editArtist,
    onSuccess: async () => {
      handleDataUpdate();
    },
    onError: async () => {
      setModalAlert(true);
      setModalText('Error al eliminar artista');
    },
  });

  const { data: artists, refetch } = useQuery({
    queryKey: ['artists'],
    queryFn: getAllArtists,
    refetchOnWindowFocus: false,
  });

  const onSubmit = (editedUser: UserType) => {
    editUser(editedUser);
  };

  const onDelete = async (userId: string) => {
    const response = await deleteArtist(userId);
    if (response.status === 204) {
      setViewArtistState(false);
      setModalAlert(true);
      setModalText('El artista se ha eliminado correctamente');
      refetch();
    } else {
      setModalAlert(true);
      setModalText('Hubo un error al eliminar el artista');
    }
  };

  const filteredArtists = artists?.artists.filter((artist: any) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className={styles.all}>
        <Modal
          title="Resultado de la operación"
          open={modalAlert}
          onCancel={() => setModalAlert(false)}
          width={400}
          footer={null}>
          <div className={styles.saveButtonContainer}>
            <p>{modalText}</p>
          </div>
        </Modal>
        <Modal
          title="Artista"
          open={viewArtistState}
          onCancel={() => setViewArtistState(false)}
          width={1600}
          footer={null}>
          {selectedArtist && (
            <ViewArtist
              user={selectedArtist}
              key={selectedArtist.id}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Link href="./artist/new">
              {' '}
              <button>
                <RiUserAddLine className={styles.icons} color="black" />
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.artist}>
          <h1>Lista de artistas</h1> <br />
          <div className={styles.header_row}>
            <div className={styles.header_a}>ARTISTA</div>
            <div className={styles.tags}>
              <div className={styles.header}>REPORTES</div>
              <div className={styles.header}>CITAS</div>
              <div className={styles.header}>PORTAFOLIO</div>
              <div className={styles.header}>PERFIL</div>
            </div>
          </div>
          <div className={styles.back}>
            <div className={styles.card_i}>
              <ArtistList
                artists={filteredArtists}
                onUserSelect={(artist) =>
                  handleUserSelect(artist)
                }></ArtistList>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Artist;
