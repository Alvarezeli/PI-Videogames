import React from "react";
import styles from "./Card.module.css";

export default function VideoCard({ name, background_image, genres }) {
  //console.log(genres)
  return (
    <div className={styles.divCard}>
      <img src={background_image} alt={name} className={styles.imgCard} />
      <div className={styles.divTitle}>
        <h3 className={styles.titleCard}>{name}</h3>
      </div>
      <div className={styles.divUl}>
        <ul className={styles.genrePadre}>
          {genres?.map((genre) => {
            return <li key={Math.random(0, 10)}>{genre.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
