import React from "react";
import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { getGenres, postVideogames } from "../actions";
//import styles from './VideogameCreate.module.css';
import Button from "./Button";
const platforms = require('../Platforms.data/platforms.json')



function validate(input){
    let errors = {};
    if (!input.name) {
        errors.name = 'Se requiere un nombre';
    } else if(!input.description){
        errors.description = 'Se requiere una descripcion'
    } else if(!input.rating){
        errors.rating = 'Se requiere que un puntaje del juego'
    } else if(!input.released){
        errors.released = 'Se requiere una fecha de lanzamiento del juego'
    } 
    return errors
}

export default function VideogameCreate(){
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const history = useHistory();
    const [errors, setError] = useState({});

    const[input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        background_image: '',
        rating: 0,
        platforms: [],
        genres: [],
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value //Agregale el target.value de lo que esta modificando
            //modifica algo y llena el estado
        })
       //Setea el estado local errors  
       setError(validate({
           ...input,
           [e.target.name] : e.target.value 
       }))
    };

    function handleSelectGenre(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    };

    function handleSelectPlatforms(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postVideogames(input))
        alert('Personaje creado')
        setInput({
            name: '',
            description: '',
            released: '',
            background_image: '',
            rating: 0,
            platforms: [],
            genres: [],
        })
        history.push('/home') //Esto redirige
    };

    function handleDelectGenre(element){
        setInput({
            ...input,
            genres: input.genres.filter(gen => gen !== element)
        })
    }

    function handleDelectPlatforms(pla){
        setInput({
            ...input,
            platforms: input.platforms.filter(pl => pl !== pla)
        })
    }

    return(
        <div>
            <NavBar/>
           <Link to = '/home'><Button>Volver</Button></Link>
           <h1>Crea tu videojuego</h1>
           <form onSubmit={(e) => handleSubmit(e)}>
               <div>
                   <label>Name</label>
                   <br/>
                   <input type='text' placeholder='Nombre del videojuego...' value={input.name} name='name' onChange={handleChange}/>
                   {errors.name && (
                       <p>{errors.name}</p>
                   )}
               </div>
               <br/>
               <div>
                   <label>Description</label>
                   <br/>
                   <input type='text' placeholder='Acerca del videojuego..' value={input.description} name='description' onChange={handleChange}/>
                   {errors.description && (
                       <p>{errors.description}</p>
                   )}
               </div>
               <br/>
               <div>
                   <label>Rating ({input.rating})</label>
                   <br/>
                   <input type='range' max='5' value={input.rating} name='rating' onChange={handleChange}/> 
                   {errors.rating && (
                       <p>{errors.rating}</p>
                   )}
               </div>
               <br/>
               <div>
                   <label>Released</label>
                   <br/>
                   <input type='text' placeholder='Fecha de lanzamiento...' value={input.released} name='released' onChange={handleChange}/>
                   {errors.released && (
                       <p>{errors.released}</p>
                   )}
               </div>
               <br/>
               <div>
                   <label>Image</label>
                   <br/>
                   <input type='text' value={input.background_image} name='background_image' onChange={(e)=>handleChange(e)}/>
               </div>
               <br/>
               <select  onChange={(e)=> handleSelectPlatforms(e)}>
                   <option>
                       Platforms
                   </option>
                   {platforms.map( platform => {
                       return(
                           <option value={platform.name} key={platform.key}>{platform.name}</option>
                       );
                   })};
               </select>
               <br/>
               <select onChange={(e)=> handleSelectGenre(e)}>
               <option value="choose" key="45">
                Choose genre
               </option>
                   {genres.map(genre => {
                       return (
                       <option value={genre.name} key={genre.id}>{genre.name}</option>
                   );
                   })};
               </select>

               <br/>
             <button type = 'submit'>Crear videojuego</button>
           </form>

           {input.genres.map(element => 
            <div>
            <p>{element}</p>    
            <button onClick={()=>handleDelectGenre(element)}>X</button>
            </div>
            )}

            {input.platforms.map(pla => 
            <div>
            <p>{pla}</p>    
            <button onClick={()=>handleDelectPlatforms(pla)} >X</button>
            </div>
            )}
        </div>
    )

}