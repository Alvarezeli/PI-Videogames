import React from "react";
import styles from './Card.module.css'

export default function VideoCard({ name, background_image, genres }) {
 //console.log(genres)
  return (
    <div className={styles.divCard}>
      <img src={background_image} alt={name} className={styles.imgCard} width = '330 px'
    height= '250 px' />
      <h3>{name}</h3>
      <ul className = {styles.genrePadre}>
        {genres?.map(genre => {
          return <li key = {Math.random(0, 10)}>{genre.name}</li>
        })}
      </ul>
    </div>
  );
}
