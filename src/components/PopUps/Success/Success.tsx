import React from 'react';
import styles from './styles.module.css';

type successProps = {
  message: string;
  onClose: () => void;
  refetch?: () => void;
};

const Success: React.FC<successProps> = ({ message, onClose, refetch }) => {
  return (
    <div className={styles.successPopup}>
      <div className={styles.successContent}>
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

export default Success;
