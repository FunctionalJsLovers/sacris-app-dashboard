'use client'
import styles from './styles.module.css'
import Image from 'next/image'
import { Input, Select, Button} from 'antd'
import { useState } from 'react'
import { Icon } from '@iconify/react'


interface UserType {
    name: string
    email: string
    artistId: string
    phone: string
  }

function ViewArtist({user}: {user?: UserType}){

    const inputStyles = {
        width: '640px',
        height: '40px',
        borderRadius: '5px',
        fontSize: '14px',
    }

    const [editState, setEditState] = useState<boolean>(false)

    return(
        <div className={styles.container}>
            <div className={styles.buttonsContainer}>
                <button className={styles.editButton} onClick={() => setEditState(true)}>
                    <Icon icon='ri:edit-line'/>
                </button>
                <button className={styles.deleteButton}>
                    <Icon icon='ri:delete-bin-2-line'/>
                </button>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.leftPanel}>
                    <div className={styles.photoCard}>
                        <Image
                        src='/src/app/login/local.png'
                        width={400}
                        height={400}
                        alt='ProfilePicture'
                        />
                    </div>
                    <div className={styles.mail}>
                        <p>Correo electrónico</p>
                        <Input defaultValue={user?.email}
                        disabled={!editState}
                        style={inputStyles}
                        />
                    </div>
                    <div className={styles.description}>
                        <p>Descripción</p>
                        <Input defaultValue={user?.email}
                        disabled={!editState}
                        style={{width: '640px', height: '100px'}}
                        />
                    </div>
                </div>
                <div className={styles.rightPanel}>
                    <div className={styles.name}>
                        <p>Nombre</p>
                        <Input defaultValue={user?.name}
                        disabled={!editState}
                        style={inputStyles}
                        />
                    </div>
                    <div className={styles.userName}>
                        <p>Nombre de usuario</p>
                        <Input defaultValue={user?.name}
                        disabled={!editState}
                        style={inputStyles}
                        />
                    </div>
                    <div className={styles.categories}>
                        <p>Categorías</p>
                        <Select defaultValue={'Blackwork'}
                        disabled={!editState}
                        className='custom-select'
                        style={inputStyles}
                        />
                    </div>
                    <div className={styles.phone}>
                        <p>Teléfono</p>
                        <Input defaultValue={user?.phone}
                        disabled={!editState}
                        style={inputStyles}
                        />
                    </div>
                    <div className={styles.instagram}>
                        <p>Instagram</p>
                        <Input defaultValue={user?.email}
                        disabled={!editState}
                        style={inputStyles}
                        />
                    </div>
                    {editState &&
                        <div className={styles.saveButtonContainer}>
                            <Button
                            type='primary'>
                                Guardar
                            </Button>
                            <Button
                            type='primary'
                            onClick={() => setEditState(false)}
                            danger>
                                Cancelar
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewArtist;