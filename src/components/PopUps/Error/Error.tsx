import React from 'react';
import styles from './styles.module.css';

type ErrorProps = {
  message: string;
  onClose: () => void;
  refetch?: () => void;
};

const Error: React.FC<ErrorProps> = ({ message, onClose, refetch }) => {
  return (
    <div className={styles.errorPopup}>
      <div className={styles.errorContent}>
        <p>{message}</p>
        <button
          onClick={() => {
            onClose();
            if (refetch) {
              refetch();
            }
          }}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Error;
