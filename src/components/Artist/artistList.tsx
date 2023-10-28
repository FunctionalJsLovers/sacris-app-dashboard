'use client';
import {
  RiFileUserLine,
  RiInboxLine,
  RiCalendarTodoLine,
  RiExternalLinkLine,
} from 'react-icons/ri';
import styles from './artist.module.css';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getAllArtists } from '../../services/ArtistsAPI';
import { useState } from 'react';

interface UserType {
  name: string;
  email: string;
  id: string;
  phone: string;
  instagram: string;
  description: string;
  username: string;
}

function ArtistList({
  onUserSelect,
}: {
  onUserSelect: (user: UserType) => void;
}) {
  const { data: artists } = useQuery({
    queryKey: ['artists'],
    queryFn: getAllArtists,
    refetchOnWindowFocus: false,
  });

  const handleEditIconClick = (user: UserType) => {
    if (user) {
      console.log(user);
      onUserSelect(user);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.artistContainer}>
        {artists?.artists?.map((artist: any) => (
          <div className={styles.card} key={artist.id}>
            <div className={styles.carddetails}>
              <div className={styles.cardImage}>
                <Image
                  src={`https://hmnhiomzwpccvhzlgahm.supabase.co/storage/v1/object/public/profile_pics/${artist.phone}.png`}
                  alt={''}
                  width={15}
                  height={15}
                  sizes="(max-width: 768px) 100vw, (max-width:1200px)50vw,33vw"
                />
              </div>
              <div className={styles.name}>
                <h1>{artist.name} </h1>
                <h3>{artist.email}</h3>
              </div>
            </div>
            <div className={styles.cardicons}>
              <RiInboxLine
                className={styles.product_icon}
                title="Ver Productos"
              />
              <RiCalendarTodoLine
                className={styles.calendar_icon}
                title="Ver Citas"
              />
              <RiExternalLinkLine
                className={styles.portfolio_icon}
                title="Ver Portafolio"
              />
              <RiFileUserLine
                className={styles.edit_icon}
                title="Editar Perfil"
                onClick={() => {
                  handleEditIconClick(artist);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistList;
