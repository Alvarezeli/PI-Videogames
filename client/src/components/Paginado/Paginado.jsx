import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({
  videogamesPerPage,
  allVideogames,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.trunc(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div>
      <p className={styles.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <button className={currentPage === number ? styles.select : styles.number } onClick={() => paginado(number)} key={number}>
              {number}
            </button>
          ))}
      </p>
    </div>
  );
}
