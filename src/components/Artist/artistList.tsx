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
  artistId: string;
  phone: string;
}

function ArtistList({
  onUserSelect,
}: {
  onUserSelect?: (user: UserType) => void;
}) {
  const { data: artists } = useQuery({
    queryKey: ['artists'],
    queryFn: getAllArtists,
    refetchOnWindowFocus: false,
  });

  const [selectedUser, setSelectedUser] = useState<UserType>();

  const handleEditIconClick = (user: UserType) => {
    setSelectedUser(user);
    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.artistContainer}>
        {artists?.map((artist: any) => (
          // eslint-disable-next-line react/jsx-key
          <div className={styles.card} key={artist.artistId}>
            <div className={styles.carddetails}>
              <div className={styles.cardImage}>
                <Image
                  src="https://s3-alpha-sig.figma.com/img/b940/caf9/f3a52bcc9317c793ebc094db911b237b?Expires=1696204800&Signature=orXUC1z2Ieogp1Td5CEEycHwZ06VwuUC-F-Y-6bgjerrygHoo6Cu0B4quPh9WSjeeilJtPm5aR385jaarT5-X0HTNHyMtAKGox7f8CM~Cj2~nGF4GxOzqjLptqZ32yNZIpj4afhEhNou4KLaaKqkE1RSu4hlWZSCFjMxASCDkjf5Ojv97PdMIesCgPDdYJo3Y2UMDvItteqVGjvv3hk-sG28gUuzbsuDyuxfXfKRLPZyJRHf1TRZynWHTfipHTmIPvBzvVMSb3gRqth6JcIQLKYEeO~3Zy5MyD-64mUzOvDNbGedlM8IBXZuj6wNm6h3pLOa-E4aMK55CQcV2u5zXw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  alt={`${artist.name}'s Avatar`}
                  width={15}
                  height={15}
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
