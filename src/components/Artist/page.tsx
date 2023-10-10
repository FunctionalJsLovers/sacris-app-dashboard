import {
  RiUserAddLine,
  RiEditLine,
  RiDeleteBin2Line,
  RiSearchLine,
} from 'react-icons/ri';
import styles from './page.module.css';
import Card from './artistList';
import Link from 'next/link';

function Artist() {
  return (
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
          <Link href="./artist/new">
            {' '}
            <button>
              <RiUserAddLine className={styles.icons} />
            </button>
          </Link>
          <button>
            <RiEditLine className={styles.icons} />
          </button>
          <button>
            <RiDeleteBin2Line className={styles.icons} />
          </button>
        </div>
      </div>
      <div className={styles.artist}>
        <h1>Lista de artistas</h1> <br />
        <div className={styles.header_row}>
          <div className={styles.header_a}>ARTISTA</div>
          <div className={styles.tags}>
            <div className={styles.header}>PRODUCTOS</div>
            <div className={styles.header}>CITAS</div>
            <div className={styles.header}>PORTAFOLIO</div>
            <div className={styles.header}>PERFIL</div>
          </div>
        </div>
        <div className={styles.back}>
          <div className={styles.card_i}>
            <Card></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
