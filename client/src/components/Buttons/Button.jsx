import React from 'react';
import styles from './Button.module.css'

export default function Buttons({onClick, children}){
    return(
        <button onClick={onClick} className={styles.button}>{children}</button>
    )
}