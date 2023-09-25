import NavBar from "@/components/NavBar/NavBar";
import React from "react";
import styles from './styles.module.css';
import Home from "@/components/Home/Home";
import AccountSection from "@/components/AccountSection/AccountSection";

const routes = [
    {
        name: 'Artistas',
        path: '/login',
        icon: '/images/iconsSelect/artists.png',
        text: 'Red'
    },
    {
        name: 'Calendario',
        path: '/',
        icon: '/images/iconsNSelect/calendar.png',
        text: 'None'
    },
    {
        name: 'Productos',
        path: '/',
        icon: '/images/iconsNSelect/products.png',
        text: 'None'
    },
    {
        name: 'Reportes',
        path: '/',
        icon: '/images/iconsNSelect/reports.png',
        text: 'None'
    },
]

const Dashboard: React.FC = () => {
    return (
        <div className={styles.allDashboard}>
            <NavBar routes={routes}/>
            <AccountSection accountName="César Moreno" notificationCount={2} photoUrl="https://th.bing.com/th/id/OIP.hFh4Uw00oR7qfvoCqnG8fQHaEK?w=186&h=104&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
            <div className={styles.content}>
                <Home/>
            </div>

        </div>
    )
}

export default Dashboard;