import { React } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterVideogamesByGenres,
  filterCreatedOrExisted,
  orderByAscDesc,
} from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import styles from "./Home.module.css";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";


export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames); //Esto es lo mismo que usar el mapStateToprops
  const allGenres = useSelector((state) => state.genres);
  //console.log(allGenres)

  /* ---> PAGINADO <--- */

  const [orden, setOrden] = useState("");
  //Nos definimos varios estados locales
  //1. Un estado con la pagina actual y otro estado que me sete la pagina actual
  const [currentPage, setCurrentPage] = useState(1); //Comienza en 1 por que siempre voy a arrancar en la 1° pag
  //2. Otro estado con los personajes por pagina y otro que lo setee
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  //Me declaro una const
  const indexOfLastVideogame = currentPage * videogamesPerPage; //15
  const indexOfFirstCharacter = indexOfLastVideogame - videogamesPerPage; //0
  //Const que contiene los personajes actuales
  const currentVideogames = allVideogames.slice(
    indexOfFirstCharacter,
    indexOfLastVideogame
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames()); //Es lo mismo que hacer el mapDispatchToprops
  }, [dispatch]); 

  /* ---> HANDLERS <--- */

  function handleFilterGenre(e) {
    dispatch(filterVideogamesByGenres(e.target.value));
  }

  function handleClickReset(e) {
    e.preventDefault(); 
    dispatch(getVideogames()); //me despache la accion y resetea todo y me trae todo de nuevo
  }

  function handleFilterCreateOrExisted(e) {
    dispatch(filterCreatedOrExisted(e.target.value));
  }

  function handleSort(e) {
   // console.log('Soy el console.log de handleSort',"por que no funcionas, quieres verme llorar?");
    e.preventDefault();
    dispatch(orderByAscDesc(e.target.value));
    setCurrentPage(1); //Cuando hago el ordenamiento setea la pagina en la primera
    setOrden(`Orders ${e.target.value}`); //es un estado local vacio que utilizp para que cuando
    //setee la pagina me modifique el estado local y se renderize
  }

  return (
    <div>
      <NavBar/>
      <h1 className={styles.title}>Videogames App</h1>
      <div>
        <div className={styles.divFilters}>
        {/*----> Ordenamiento<----*/}
        <select onChange={(e) => handleSort(e)}>
          <option>Orders</option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
          <option value="low_ToBest">Lowest to best rating</option>
          <option value="best_ToLow">Best to lowest rating</option>
        </select>
        {/*----> Filtrado por Creados o Existentes <----*/}
        <select onChange={(e) => handleFilterCreateOrExisted(e)}>
          <option value="all">All</option>
          <option value="created">Created by me</option>
          <option value="existed">From Api</option>
        </select>
        {/*----> Filtrado por Genres <----*/}
        <select onChange={(e) => handleFilterGenre(e)}>
          <option value="All" key="30">
            All genres
          </option>
          {allGenres && allGenres.map((genre) => {
            return (
              <option value={genre.name} key={genre.id}>
                {genre.name}
              </option>
            );
          })} 
        </select>
        <button onClick={(e) => { handleClickReset(e)}}> Reset filters </button>
        </div>
        <div className={styles.cardPadre}>
          {currentVideogames ? currentVideogames.map((v) => {
            // console.log(v)
            return (
              <div key={v.id}>
                <Link to={"/home/" + v.id}>
                  <Card
                    name={v.name}
                    background_image={v.background_image}
                    genres={v.genres}
                    key={v.id}
                  />
                </Link>
              </div>
            );
          }) : 
          <Loading />
          }
        </div>
        {/*Props que necesita el paginado para funcionar*/}
        <Paginado 
        videogamesPerPage = {videogamesPerPage}
        allVideogames = {allVideogames.length}
        paginado = {paginado}
        />
      </div>
    </div>
  );
}
