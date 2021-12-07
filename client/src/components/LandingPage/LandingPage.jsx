import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";


export default function LandingPage() {
  return (
      <div className={styles.divPadre}>
        <Link to="/home">
          <button className={styles.btnlan}>¡Let's play!</button>
        </Link>
      </div>
  );
}
