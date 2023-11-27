import React from 'react';
import styles from './styles.module.css';

function Home() {
  return (
    <div className={styles.allHome}>
      <div className={styles.images}>
        <div className={styles.imageContainer}>
          <div className={styles.image1}></div>
          <div className={styles.image3}></div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.image2}></div>
        </div>
      </div>
      <div className={styles.text}>
        <h1 className={styles.sacrisText}>SacrisApp</h1>
      </div>
    </div>
  );
}

export default Home;
