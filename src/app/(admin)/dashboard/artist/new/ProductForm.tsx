"use client"
import { useState } from 'react';
import styles from './Form.module.css'
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

function CustomForm() {
  const [file, setFile] = useState(null)
  const [artist, setArtist] = useState({
    name: "",
    phone: "",
    email: String
  })

  const handleChange = (e: any) => {
    setArtist({
      ...artist,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e.target.data)
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>

      <div className={styles.formLeft}>
        <div className={styles.img}> {file && (<Image src={URL.createObjectURL(file)} width={250} height={250} alt={''} />)}
        </div>
        <input type="file" name="image" className={styles.inputImage}
          onChange={(e: any) => {
            setFile(e.target.files[0])
          }} />
        <label className={styles.label} htmlFor='email'>Mail</label><br />
        <input type="email" name="email" className={styles.input} onChange={handleChange} />
        <label className={styles.label} htmlFor='description'>Descripción</label>
        <textarea name="description" className={styles.textarea} />
      </div>
      <div className={styles.formRight}>
        <label className={styles.label} htmlFor='name'>Nombre</label>
        <input type="text" name="name" className={styles.input} onChange={handleChange} />
        <label className={styles.label} htmlFor='username'>User Name</label>
        <input type="text" name="username" className={styles.input} />
        <label className={styles.label} htmlFor='categories'>Categorías</label>
        <input type="text" name="categories" className={styles.input} />
        <label className={styles.label} htmlFor='phone'>Teléfono</label>
        <input type="text" name="phone" className={styles.input} onChange={handleChange} />
        <label className={styles.label} htmlFor='instagram'>Instagram</label>
        <input type="text" name="instagram" className={styles.input} />

        <div className={styles.formButtons}>
          <button className={styles.confirmButton} onSubmit={handleSubmit}>Confirmar</button>
          <Link href="/dashboard/artist"> <button className={styles.cancelButton}>Cancelar</button></Link>
        </div>
      </div>
    </form>
  );
};

export default CustomForm;
