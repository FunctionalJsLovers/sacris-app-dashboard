'use client';
import styles from './styles.module.css';
import React, { useState } from "react";
export default function LoginPage() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <div className={styles.all}>
            <div className={styles.loginContainer}>
                <h2 className={styles.welcome}>¡Bienvenido!</h2>
                <h1 className={styles.textStart}>Inicia Sesión</h1>
                <h3 className={styles.textSacris}>SacrisApp</h3>
                <form className={styles.form}>
                    <label htmlFor="username" className={styles.label}>Nombre de usuario</label>
                    <input
                        className={styles.username}
                        type="text"
                        id="username"
                        placeholder="Enter your user name"
                    />

                    <label htmlFor="password" className={styles.label}>Contraseña</label>
                    <div className={styles.passwordInput}>
                        <input className={styles.password}
                               type={passwordVisible ? 'text' : 'password'}
                               id="password"
                               placeholder="Enter your password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        >
                        </input>
                        <span
                            className={`${styles.togglePassword} ${
                                passwordVisible ? styles.togglePasswordHidden : styles.togglePasswordVisible
                            }`}
                            onClick={togglePasswordVisibility}
                        >
                        </span>
                    </div>
                    <button type="submit" className={styles.buttonLogin}>Login</button>
                </form>
            </div>
        </div>
    )
}