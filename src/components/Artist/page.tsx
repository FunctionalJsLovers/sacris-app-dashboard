/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-multiple-empty-lines */
'use client'
import { RiUserAddLine, RiEditLine, RiDeleteBin2Line, RiSearchLine } from 'react-icons/ri'
import styles from './page.module.css'
import ArtistList from './artistList'
import Link from 'next/link'
import { useState } from 'react'
import ViewArtist from '@/app/(admin)/dashboard/artist/ViewArtist/ViewArtist'
import {Modal} from 'antd'

interface UserType {
    name: string
    email: string
    artistId: string
    phone: string
  }

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Artist () {

    const [selectedArtist, setSelectedArtist] = useState<UserType>()
    const [viewArtistState, setViewArtistState] = useState<boolean>(false)

    const handleSelectArtist = (artist: UserType) => {
        setSelectedArtist(artist)
        setViewArtistState(true)
    }

  return (
        <div className={styles.all}>
            <Modal
                title="Artista"
                open={viewArtistState}
                onCancel={() => setViewArtistState(false)}
                width={1600}
                footer={null}
                >
                <ViewArtist user={selectedArtist}></ViewArtist>
            </Modal>
            <div className={styles.main}>
                <div className={styles.inputContainer} >
                    <RiSearchLine className={styles.searchIcon} />
                    <input className={styles.inputField}
                        type="text"
                        placeholder="Type here..." />
                </div>
                <div className={styles.buttonContainer}>
                    <Link href="./artist/new" >   <button>
                        <RiUserAddLine className={styles.icons} />
                    </button></Link>
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
                    <ArtistList onUserSelect={handleSelectArtist}></ArtistList>
                    </div>
                    </div>
            </div>
        </div>

  )
}

export default Artist

