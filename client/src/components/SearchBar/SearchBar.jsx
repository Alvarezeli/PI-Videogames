import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogames } from "../../actions";
import styles from './SearchBar.module.css';


export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
       // console.log(name) 
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameVideogames(name))
        //setName('')
        document.getElementById('search').value = '';
        document.getElementById('search').focus();
    };

    return(
        <div className={styles.searchPadre}>
            <input 
              id = 'search'
              onChange = {handleInputChange}
              type = 'text'
              placeholder = 'Search & discover...'
            />
            <button type = 'submit' onClick={handleSubmit}>Search</button>
        </div>
    )
};