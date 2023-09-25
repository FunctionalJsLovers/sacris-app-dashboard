import React from "react";
import styles from './styles.module.css';

interface AccountSectionProps {
    accountName: string;
    notificationCount: number;
    photoUrl: string;
}

const AccountSection: React.FC<AccountSectionProps> = ({
                                                           accountName,
                                                           notificationCount,
                                                           photoUrl,
                                                       }) => {
    return (
        <div className={styles.accountSection}>
            <div className={styles.notificationIcon}>
                <span>{notificationCount}</span>
                <img className={styles.iconN} src="https://cdn.icon-icons.com/icons2/494/PNG/512/alarm_icon-icons.com_48364.png" alt="Notificaciones" />
            </div>
            <div className={styles.userInfo}>
                <span>{accountName}</span>
                <img src={photoUrl} alt={`Foto de ${accountName}`} />
            </div>
        </div>
    );
};

export default AccountSection;