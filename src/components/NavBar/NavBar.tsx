'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './styles.module.css';
import Image from "next/image";

interface Route {
    name: string;
    path: string;
    icon: string;
    text: string;
}

interface NavBarProps {
    routes: Route[];
}

const NavBar: React.FC<NavBarProps> = ({ routes }) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <nav
            className={`${styles.navBar} ${expanded ? styles.expanded : ''}`}>
            <div className={styles.divLogo}>
                <Image className={styles.Logo} src="/images/Logo.png" alt="SacrisApp" width={50} height={50}/>
            </div>
            <div className={styles.line}>
                <div className={styles.iconExpande} onClick={handleToggleExpand}>
                    {expanded ? '<' : '>'}
                </div>
            </div>
            <ul>
                {routes.map((route, index) => (
                    <li key={index}>
                        <Link href={route.path}>
                            <div className={styles.link}>
                                <span>
                                    <Image src={route.icon} alt={route.name} width={25} height={25}></Image>
                                </span>
                                {expanded && (
                                    <span className={route.text === 'Red' ? styles.textRed : styles.text}>
                                        {route.name}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className={styles.accountSection}>
                <div className={styles.account}>
                    <Link href="/">
                        <Image src="/images/iconsNSelect/account.png" alt="Cuenta" width={25} height={25}/>
                        {expanded && <span className={styles.textAccount}>Cuenta</span>}
                    </Link>
                </div>
                <div className={styles.logout}>
                    <Link href="/">
                        <Image src="/images/iconsNSelect/logout.png" alt="Salir" width={25} height={25}/>
                        {expanded && <span className={styles.textLogout}>Salir</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
