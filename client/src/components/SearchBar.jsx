import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
       // console.log(name)
       //setName('');
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameVideogames(name))
    }

    return(
        <div>
            <input 
              onChange = {handleInputChange}
              type = 'text'
              placeholder = 'Buscar...'
            />
            <button type = 'submit' onClick={handleSubmit}>Buscar</button>
        </div>
    )
};