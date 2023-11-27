import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Icon } from '@iconify/react';

const Default = () => {
  return (
    <div className={styles.containerDefault}>
      <Icon
        className={styles.iconWarning}
        icon={'ri:folder-warning-line'}
        height={100}
        width={100}></Icon>
      <h2>
        Seleccione alguna de las citas disponibles o presione el ícono de crear.
      </h2>
    </div>
  );
};

export default Default;
