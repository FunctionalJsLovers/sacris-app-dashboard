/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-multiple-empty-lines */
import { RiUserAddLine, RiEditLine, RiDeleteBin2Line, RiSearchLine } from 'react-icons/ri'
import styles from './page.module.css'
import Card from './artistList'
import Link from 'next/link'


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Artist () {
  return (
        <div className={styles.all}>
            <div className={styles.main}>
                <div className={styles.inputContainer} >
                    <RiSearchLine className={styles.searchIcon} />
                    <input className={styles.inputField}
                        type="text"
                        placeholder="Buscar..." />
                </div>
                <div className={styles.buttonContainer}>
                    <Link href="./artist/new" >   <button>
                        <RiUserAddLine className={styles.icons} />
                    </button></Link>
                    <button>
                        <RiEditLine className={styles.icons} />
                    </button>
                    <button
                    >
                        <RiDeleteBin2Line className={styles.icons} />
                    </button>
                </div>
            </div>
            <div className={styles.artist}>
                <h1>Lista De Artistas</h1> <br />
                <div className={styles.header_row}>
                    <div className={styles.header_a}>Artista</div>
                    <div className={styles.tags}>
                        <div className={styles.header}>Producto</div>
                        <div className={styles.header}>Cita</div>
                        <div className={styles.header}>Portafolio</div>
                        <div className={styles.header}>Perfil</div>
                    </div>
                </div>
                <div className={styles.card}>
                    <Card></Card>
                </div>

            </div>
        </div>

  )
}

export default Artist

