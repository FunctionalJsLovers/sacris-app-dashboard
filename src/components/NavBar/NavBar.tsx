'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Icon } from '@iconify/react/dist/iconify.js';

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
  const [selected, setSelected] = useState('true');

  const handleMenuItemClick = (label: string) => {
    setSelected(label);
    localStorage.setItem('selected', String(label));
  };

  useEffect(() => {
    const selectedValue = localStorage.getItem('selected');
    setSelected(selectedValue ? selectedValue : '');
  }, [selected]);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleBeforeUnload = () => {
    localStorage.clear();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <nav className={`${styles.navBar} ${expanded ? styles.expanded : ''}`}>
      <Link href="/dashboard">
        <div className={styles.divLogo}>
          <Image
            className={styles.Logo}
            src="/images/Logo.png"
            alt="SacrisApp"
            width={50}
            height={50}
          />
        </div>
      </Link>
      <div className={styles.line}>
        <div className={styles.iconExpande} onClick={handleToggleExpand}>
          {expanded ? '<' : '>'}
        </div>
      </div>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            <Link
              href={route.path}
              onClick={() => handleMenuItemClick(route.path)}>
              <div className={styles.link}>
                <span>
                  <Icon
                    icon={route.icon}
                    color={route.path === selected ? '#cb3230' : 'BBBFC1'}
                    width={25}
                    height={25}></Icon>
                </span>
                {expanded && (
                  <span
                    className={
                      route.path === selected ? styles.textRed : styles.text
                    }>
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
            <Image
              src="/images/iconsNSelect/account.png"
              alt="Cuenta"
              width={25}
              height={25}
            />
            {expanded && <span className={styles.textAccount}>Cuenta</span>}
          </Link>
        </div>
        <div
          className={styles.logout}
          onClick={() =>
            signOut({ callbackUrl: `http://localhost:3000/api/auth/signout` })
          }>
          <Icon icon="ri:logout-circle-line" color="BBBFC1" width={'25px'} />
          {expanded && <span className={styles.textAccount}>Salir</span>}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
