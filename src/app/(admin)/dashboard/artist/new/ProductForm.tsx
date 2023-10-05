/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/react-in-jsx-scope */
'use client'
import { useState } from 'react'
import styles from './Form.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useMutation } from 'react-query'

function CustomForm () {
  const [file, setFile] = useState(null)
  const [artist, setArtist] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const mutation = useMutation(async function (artistData: any) {
    const response = await fetch(
      'https://handsomely-divine-abstracted-bed.deploy.space/artists/',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(artistData)
      }
    )
    return await response.json()
  },
  {
    onSuccess: function (json) {
      console.log('creado')
    },
    onError: function (error) {
      console.log(error)
    }
  })

  const handleChange = (e: any) => {
    setArtist({
      ...artist,
      [e.target.name]: e.target.value
    })
  }

  const handlePhoneBlur = () => {
    const phoneValue = artist.phone
    if (phoneValue && !/^\d+$/.test(phoneValue)) {
      alert('El campo Teléfono debe contener solo números.')
      setArtist({
        ...artist,
        phone: ' '
      })
    }
  }
  const handleNameBlur = () => {
    const nameValue = artist.name
    if (nameValue && !/^[a-zA-Z]+$/.test(nameValue)) {
      alert('El campo Nombre debe contener solo letras.')
      setArtist({
        ...artist,
        name: ''
      })
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if ((artist.name === '') || (artist.phone === '') || (artist.email === '')) {
      alert(
        'Por favor, complete todos los campos requeridos (Nombre, Teléfono, Email).'
      )
      return
    }
    mutation.mutate(artist)
    console.log(artist)
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope, @typescript-eslint/no-misused-promises
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formLeft}>
        <div className={styles.img}>
          {' '}
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              width={250}
              height={250}
              alt={''}
            />
          )}
        </div>
        <input
          type="file"
          name="image"
          className={styles.inputImage}
          onChange={(e: any) => {
            setFile(e.target.files[0])
          }}
        />
        <label className={styles.label} htmlFor="email">
          Mail
        </label>
        <br />
        <input
          type="text"
          name="email"
          className={styles.input}
          onChange={handleChange}
        />
        <label className={styles.label} htmlFor="description">
          Descripción
        </label>
        <textarea name="description" className={styles.textarea} />
      </div>
      <div className={styles.formRight}>
        <label className={styles.label} htmlFor="name">
          Nombre
        </label>
        <input
          type="text"
          name="name"
          className={styles.input}
          onChange={handleChange}
          onBlur={handleNameBlur}
        />
        <label className={styles.label} htmlFor="username">
          User Name
        </label>
        <input type="text" name="username" className={styles.input} />
        <label className={styles.label} htmlFor="categories">
          Categorías
        </label>
        <input type="text" name="categories" className={styles.input} />
        <label className={styles.label} htmlFor="phone">
          Teléfono
        </label>
        <input
          type="text"
          name="phone"
          className={styles.input}
          onChange={handleChange}
          onBlur={handlePhoneBlur}
        />
        <label className={styles.label} htmlFor="instagram">
          Instagram
        </label>
        <input type="text" name="instagram" className={styles.input} />

        <div className={styles.formButtons}>
          <button className={styles.confirmButton} onSubmit={handleSubmit}>
            Confirmar
          </button>
          <Link href="/dashboard/artist">
            {' '}
            <button className={styles.cancelButton}>Cancelar</button>
          </Link>
        </div>
        {mutation.isLoading && <div className={styles.msg}>
          <h1 className={styles.label}>Creando Artista...</h1></div>}
        {mutation.isSuccess && <div className={styles.msg}>
          <h1 className={styles.label}>se a creado correctamente</h1>
          <Link href="/dashboard/artist">
            {' '}<button className={styles.menuButton}> Volver</button> </Link></div>}
        {mutation.isError && (
          <div className={styles.errorMsg}>
            <h1>Ha ocurrido un error. El artista ya existe o ha habido un problema en el servidor.</h1>
          </div>
        )}
      </div>
    </form>
  )
}

export default CustomForm
