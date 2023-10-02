'use client';
import styles from './styles.module.css';
import React, { useState } from "react";
import { signIn, useSession } from 'next-auth/react';

export default function LoginPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const { data: session, status } = useSession();


    return (
        <div className={styles.all}>
            <div className={styles.loginContainer}>
                <h2 className={styles.welcome}>¡Bienvenido!</h2>
                <h1 className={styles.textStart}>Inicia Sesión</h1>
                <h3 className={styles.textSacris}>SacrisApp</h3>
                <form className={styles.form}>
                    {session && <p className={styles.textSacris}>Ya estás logueado como {session.user?.email}</p>}
                    <button onClick={() => signIn()} className={styles.buttonLogin}>LoginAuth0</button>
                </form>
            </div>
        </div>
    )
}