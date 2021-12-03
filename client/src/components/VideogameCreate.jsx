import React from "react";
import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getGenres, postVideogames } from "../actions";

export default function VideogameCreate(){
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const history = useHistory();

    const[input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        background_image: '',
        rating: '',
        platforms: [],
        genres: [],
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value //Agregale el target.value de lo que esta modificando
            //modifica algo y llena el estado
        })
        console.log('SOY EL INPUT', input)
    };

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
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
            rating: '',
            platforms: [],
            genres: [],
        })
        history.push('/home') //Esto redirige
    };

    return(
        <div>
           <Link to = '/home'> <button>Volver</button></Link>
           <h1>Crea tu videojuego</h1>
           <form onSubmit={(e) => handleSubmit(e)}>
               <div>
                   <label>Name</label>
                   <br/>
                   <input type='text' value={input.name} name='name' onChange={handleChange}/>
               </div>
               <br/>
               <div>
                   <label>Description</label>
                   <br/>
                   <input type='text' value={input.description} name='description' onChange={handleChange}/>
               </div>
               <br/>
               <div>
                   <label>Rating</label>
                   <br/>
                   <input type='text' value={input.rating} name='rating' onChange={handleChange}/>
               </div>
               <br/>
               <div>
                   <label>Released</label>
                   <br/>
                   <input type='text' value={input.released} name='released' onChange={handleChange}/>
               </div>
               <br/>
               <div>
                   <label>Image</label>
                   <br/>
                   <input type='text' value={input.background_image} name='background_image' onChange={(e)=>handleChange(e)}/>
               </div>
               <br/>
               <div>
                   <label>Platforms</label>
                   <br/>
                   <label><input type='checkbox' name='PlayStation 5' value='PlayStation 5'/>PlayStation 5</label>
                   <label><input type='checkbox' name='PlayStation 4' value='PlayStation 4'/>PlayStation 4</label>
                   <label><input type='checkbox' name='PlayStation 3' value='PlayStation 3'/>PlayStation 3</label>
                   <label><input type='checkbox' name='PlayStation 2' value='PlayStation 2'/>PlayStation 2</label>
                   <label><input type='checkbox' name='PlayStation' value='PlayStation'/>PlayStation </label>
               </div>
               <br/>
               <select onChange={(e)=> handleSelect(e)}>
               <option value="choose" key="45">
                Choose genre
               </option>
                   {genres.map(genre => {
                       return (
                       <option value={genre.name} key={genre.id}>{genre.name}</option>
                   );
                   })};
               </select>
               <ul><li>{input.genres.map(el => el + ',')}</li></ul>
               <br/>
             <button type = 'submit'>Crear videojuego</button>
           </form>
        </div>
    )

}