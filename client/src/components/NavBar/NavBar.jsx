import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css'

export default function NavBar(){
 return(
    <div className={styles.divNav}>
        <Link to='/'>Welcome</Link>
        <Link to='/home'>Home</Link>
        <Link to='/videogame'>Create Videogame</Link>
        <SearchBar/>
    </div>
 )
}