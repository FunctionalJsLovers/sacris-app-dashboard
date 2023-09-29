import React from "react";
import styles from "./styles.module.css";

type ErrorProps = {
    message: string;
    onClose: () => void;
}

const Error: React.FC<ErrorProps> = ({ message, onClose}) => {
    return (
        <div className={styles.errorPopup}>
            <div className={styles.errorContent}>
                <p>{message}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    )
}

export default Error;