import React from "react";
import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { postVideogames } from "../../actions";
import styles from './VideogameCreate.module.css';
import Button from "../Buttons/Button";

const platforms = require('../../Platforms.data/platforms.json')


///---> VALIDACION DE ERRORES <---///
function validate(input){
    let errors = {};
    // --> VALIDACION NOMBRE <-- //
    if (!input.name) {
        errors.name = 'Se require un nombre';
    } else if(!/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(input.name)){
        errors.name = 'El nombre es invalido'
    }
    // --> VALIDACION DESCRIPCION <-- //
    if(!input.description){
        errors.description = 'Se requiere una descripcion'
    } else if(!/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/.test(input.description)){
        errors.description = 'La descripcion es invalida'
    }
 
    // --> VALIDACION RATING <-- //
    if(!input.rating){
        errors.rating = 'Se requiere que un puntaje del juego'
    } else if(!/[0-5]/.test(input.rating)){
        errors.rating = 'El rating ingresado es invalido'
    }

    // --> VALIDACION LANZAMIENTO <-- //
    if(!input.released){
        errors.released = 'Se requiere una fecha de lanzamiento'
    } 
    return errors;
};


/*
function validate(input){
    let errors = {};
    if (!input.name) {
        errors.name = 'Se require un nombre';
    } else if(!input.description){
        errors.description = 'Se requiere una descripcion'
    } else if(!input.rating){
        errors.rating = 'Se requiere que un puntaje del juego'
    } else if(!input.released){
        errors.released = 'Se requiere una fecha de lanzamiento del juego'
    } 
    return errors
};
*/

///---> FORMULARIO <---///
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
       // console.log(input)
        dispatch(postVideogames(input))
        alert('Personaje creado')
        setInput({
            name: '',
            description: '',
            released: '',
            background_image: '',
            rating: '',
            platforms: [],
            genres: [],
        })
        history.push('/home') //Esto redirige
    };

    /// ---> BOTON DE ELIMINAR <--- ///
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

    /// ---> INICIO DE FORM <--- ///    
    return(
        <div className={styles.divPadre}>
           <NavBar/>
           <Link to = '/home'><Button>Volver</Button></Link>
           <h1 className={styles.tittle}>Create your videogame</h1>
           <form onSubmit={(e) => handleSubmit(e)} className={styles.divForm}>
               <div>
                   <label>Name</label>
                   <br/>
                   <input className={errors.name && 'danger'} type='text' placeholder='Nombre del videojuego...' value={input.name} name='name' onChange={handleChange}/>
                   {errors.name && (
                       <p className='danger'>{errors.name}</p>
                   )}
               </div>
               <br/>
               <div>
                   <label>Description</label>
                   <br/>
                   <input className={errors.description && 'danger'} type='text' placeholder='Acerca del videojuego..' value={input.description} name='description' onChange={handleChange}/>
                   {errors.description && (
                       <p className='danger'>{errors.description}</p>
                   )}
               </div>
               <br/>
               <div>
                   <label>Rating</label>
                   <br/>
                   <input className={errors.rating && 'danger'} placeholder='Rating 0-5' type='number' min='0' max='5' value={input.rating} name='rating' onChange={handleChange}/> 
                   {errors.rating && (
                       <p className='danger'>{errors.rating}</p>
                   )}
               </div>
               <br/>
               <div>
                   <label>Released</label>
                   <br/>
                   <input className={errors.released && 'danger'} type='date' placeholder='Fecha de lanzamiento...' value={input.released} name='released' onChange={handleChange}/>
                   {errors.released && (
                       <p className='danger'>{errors.released}</p>
                   )}
               </div>
               <br/>
               <div>
                   <label>Image</label>
                   <br/>
                   <input type='text' value={input.background_image} name='background_image' onChange={(e)=>handleChange(e)} required/>
               </div>
               <br/>
               <div className={styles.selects}>
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
                </div>
               <br/>
             <button className={styles.btnCrear} type = 'submit'>Crear videojuego</button> 
           </form>

           {input.genres.map(element => 
            <div className={styles.cardGenre}>
            <div>{element}</div>    
            <button onClick={()=>handleDelectGenre(element)} className={styles.btnGenre}>X</button>
            </div>
            )}

            {input.platforms.map(pla => 
            <div className={styles.cardPlat}>
            <div>{pla}</div>    
            <button onClick={()=>handleDelectPlatforms(pla)} className={styles.btnPla}>x</button>
            </div>
            )}
        </div>
    )

}