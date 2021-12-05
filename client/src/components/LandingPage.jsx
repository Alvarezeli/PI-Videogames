import React from "react";
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div>
      <h1 className={styles.texto}>Ya se me va a ocurrir algo, no hoy</h1>
      <Link to="/home">
        <button>¡Let's play!</button>
      </Link>
    </div>
  );
}
