import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Details(props){
 console.log('SOY EL CONSOLE.LOG DE PROPS', props)
 const dispatch = useDispatch();

 useEffect(()=>{
     dispatch(getDetail(props.match.params.id))
 }, [dispatch])

 const detailVideogame = useSelector((state) => state.detail);
 console.log ('SOY EL CONSOLE.LOG DEL STATE', detailVideogame)
return(
    <div> 

        <Link to='/home'>
            <button>Volver</button>
        </Link>
    
        {
            detailVideogame.name ?
            <div>
                <h1>{detailVideogame.name}</h1>
                <img src={detailVideogame.background_image}  width="400" height="400"  alt=""/>
                <p>Description: <p dangerouslySetInnerHTML={{__html: detailVideogame.description,}}/></p>
                <h5>{detailVideogame.released}</h5>
                <h5>{detailVideogame.rating}</h5>
                <ul>{ detailVideogame?.genres.map(g => <li>{g.name}</li>)  }</ul>
                <ul>{detailVideogame.platforms.map(p => <li>{p}</li>)}</ul>
            </div> : <p>💥💥¡Disculpe las molestias, esto va a llevar un tiempo!💥💥</p>
        }

    </div>
)
}
//Description: <p dangerouslySetInnerHTML={{__html: videogame.description,}}/>