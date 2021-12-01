import { React } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterVideogamesByGenres } from "../actions";
import Card from './Card';
import Paginado from "./Paginado";
import styles from './Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames); //Esto es lo mismo que usar el mapStateToprops

  //Vamos a intentar el paginado
  //Nos definimos varios estados locales 
  //1. Un estado con la pagina actual y otro estado que me sete la pagina actual
  const [currentPage, setCurrentPage] = useState(1) //Comienza en 1 por que siempre voy a arrancar en la 1° pag
  //2. Otro estado con los personajes por pagina y otro que lo setee
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  //Me declaro una const
  const indexOfLastVideogame = currentPage * videogamesPerPage //15
  const indexOfFirstCharacter = indexOfLastVideogame - videogamesPerPage //0
  //Const que contiene los personajes actuales
  const currentVideogames = allVideogames.slice(indexOfFirstCharacter, indexOfLastVideogame)
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  useEffect(() => {
    dispatch(getVideogames()); //Es lo mismo que hacer el mapDispatchToprops
  }, [dispatch]); //[] lo pasas vacio por que no depende de nada

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleFilterGenre(e){
    dispatch(filterVideogamesByGenres(e.target.value))
  }

  return (
    <div>
      <Link to="/videogame">Crear videogame</Link>
      <h1>Necesito creatividad</h1>
      <button onClick={(e) => {handleClick(e)}}>
        Traer los videojuegos de nuevo
      </button>
      <div>
        <select>
          <option>Orders</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
          <option value="low_Best">Lowest to best rating</option>
          <option value="best_Low">Best to lowest rating</option>
        </select>
        <select>
          <option>Created o Existed</option>
          <option value="created">Created by me</option>
          <option value="existed">Existed</option>
        </select>
        <select onChange= {(e) => handleFilterGenre(e)}>
          <option value="All">All genres</option>
          <option value="Action">Action</option>
          <option value="Indie">Indie</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Shooter">Shooter</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Arcade">Arcade</option>
          <option value="Platformer">Platformer</option>
          <option value="Racing">Racing</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
          <option value="Fighting">Fighting</option>
          <option value="Family">Family</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
        </select>
        {/*Props que necesita el paginado para funcionar*/}
        <Paginado 
        videogamesPerPage = {videogamesPerPage}
        allVideogames = {allVideogames.length}
        paginado = {paginado}
        />
        <div className = {styles.cardPadre}>
        { currentVideogames?.map((v)=>{
         // console.log(v)
            return (
              <>
                <Link to={'/home/' + v.id}>
                <Card name={v.name} background_image={v.background_image} genres={v.genres} key={v.id}/>
                </Link>
              </>
            );  
          })}
         </div>
      </div>
    </div>
  );
}
