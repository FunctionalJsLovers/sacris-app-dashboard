'use client';
import {
  RiFileUserLine,
  RiInboxLine,
  RiCalendarTodoLine,
  RiBarChart2Line,
  RiExternalLinkLine,
} from 'react-icons/ri';
import styles from './artist.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ArtistCalendarPopup from '@/components/ArtistCalendarPopup/ArtistCalendarPopup';
import ArtistReport from '@/components/ArtistReport/ArtistReport';

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
  artists,
}: {
  onUserSelect: (user: UserType) => void;
  artists: UserType[];
}) {
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [selectedArtistName, setSelectedArtistName] = useState<string | null>(
    null,
  );

  const handleEditIconClick = (user: UserType) => {
    if (user) {
      console.log(user);
      onUserSelect(user);
    }
  };

  const handleCalendarIconClick = (user: UserType) => {
    setSelectedArtistId(user.id);
  };

  const handleCloseCalendarPopup = () => {
    setSelectedArtistId(null);
  };

  const handleReportIconClick = (user: UserType) => {
    setSelectedArtistName(user.name);
  };

  const handleCloseReportPopup = () => {
    setSelectedArtistName(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.artistContainer}>
        {artists?.map((artist: any) => (
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
              <RiBarChart2Line
                className={styles.product_icon}
                title="Ver reporte"
                onClick={() => handleReportIconClick(artist)}
              />
              <RiCalendarTodoLine
                className={styles.calendar_icon}
                title="Ver Citas"
                onClick={() => handleCalendarIconClick(artist)}
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
      {selectedArtistId && (
        <div className={styles.artistCalendarPopup}>
          <div className={styles.popupContent}>
            <ArtistCalendarPopup
              artistId={selectedArtistId}
              onClose={handleCloseCalendarPopup}
            />
          </div>
        </div>
      )}
      {selectedArtistName && (
        <div className={styles.artistCalendarPopup}>
          <div className={styles.popupContent}>
            <ArtistReport
              artistName={selectedArtistName}
              onClose={handleCloseReportPopup}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtistList;
