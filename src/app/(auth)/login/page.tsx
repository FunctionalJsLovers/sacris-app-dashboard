'use client';
import styles from './styles.module.css';
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session?.user, 'session');

  const handleSignIn = () => {
    signIn();
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  return (
    <div className={styles.all}>
      <div className={styles.loginContainer}>
        <h2 className={styles.welcome}>¡Bienvenido!</h2>
        <h1 className={styles.textStart}>Inicia Sesión</h1>
        <h3 className={styles.textSacris}>SacrisApp</h3>
        <form className={styles.form}>
          {session && (
            <p className={styles.textSacris}>
              Ya estás logueado como {session.user?.email}
            </p>
          )}
          <button onClick={() => handleSignIn()} className={styles.buttonLogin}>
            LoginNextAuth
          </button>
          <Link href="/api/auth/login">
            <button className={styles.buttonLogin}>LoginAuth0</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
