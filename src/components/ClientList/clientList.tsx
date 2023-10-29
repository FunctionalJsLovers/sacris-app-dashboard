'use client';
import { RiFileUserLine } from 'react-icons/ri';
import styles from './client.module.css';

interface UserType {
  name: string;
  email: string;
  id: string;
  phone: string;
}

function ClientList({
  onUserSelect,
  clients,
}: {
  onUserSelect: (user: UserType) => void;
  clients: UserType[];
}) {
  const handleEditIconClick = (user: UserType) => {
    if (user) {
      onUserSelect(user);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.artistContainer}>
        {clients?.map((client: any) => (
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
