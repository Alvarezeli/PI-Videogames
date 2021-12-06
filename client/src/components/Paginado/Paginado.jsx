import React from "react";
import styles from './Paginado.module.css'

export default function Paginado({videogamesPerPage, allVideogames, paginado}) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.trunc(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1)
  }

  return(
      <nav>
          <ul className = {styles.paginado}>
              { pageNumbers && 
              pageNumbers.map( number => (
                  <li className = {styles.number} key={number}>
                  <a onClick={() => paginado(number)}>{number}</a>
                  </li>
              ))}
          </ul>
      </nav>
  )
}
