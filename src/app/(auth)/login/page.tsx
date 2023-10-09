'use client';
import styles from './styles.module.css';
import React, { useState } from "react";
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const { data: session, status } = useSession();

    console.log(session?.user,'session')


    return (
        <div className={styles.all}>
            <div className={styles.loginContainer}>
                <h2 className={styles.welcome}>¡Bienvenido!</h2>
                <h1 className={styles.textStart}>Inicia Sesión</h1>
                <h3 className={styles.textSacris}>SacrisApp</h3>
                <form className={styles.form}>
                    {session && <p className={styles.textSacris}>Ya estás logueado como {session.user?.email}</p>}
                    <button onClick={() => signIn()} className={styles.buttonLogin}>LoginNextAuth</button>
                    <Link href='/api/auth/login'>
                        <button className={styles.buttonLogin}>LoginAuth0</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}