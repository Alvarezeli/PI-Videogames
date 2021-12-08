import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Button from "../Buttons/Button";
import styles from "./Details.module.css";

export default function Details(props) {
  // console.log('SOY EL CONSOLE.LOG DE PROPS', props)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const detailVideogame = useSelector((state) => state.detail);
  //console.log ('SOY EL CONSOLE.LOG DEL STATE', detailVideogame)
  return (
    <div>
      <NavBar />
      <Link to="/home">
        <Button>Volver</Button>
      </Link>
      <div className={styles.padreDiv}>
        {detailVideogame.name ? (
          <div className={styles.divContenedor}>
             <img
              src={detailVideogame.background_image}
              alt=""
            />
            <div>
              <h1>{detailVideogame.name}</h1>
              <div className={styles.divUl}>
                <div>
                  <h4>Genres</h4>
                  <ul>
                    {detailVideogame?.genres.map((g) => (
                      <li>{g.name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Platforms</h4>
                  <ul>
                    {detailVideogame.platforms.map((p) => (
                      <li>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.divRecargado}>
                  <div>
                    <h4>Released</h4>
                    <h5>{detailVideogame.released}</h5>
                  </div>
                  <div>
                    <h4>Rating</h4>
                    <h5>{detailVideogame.rating}</h5>
                  </div>
              </div>
            </div>
            <div className={styles.divAbout}>
            
             <h4>About:</h4> 
              <p
                dangerouslySetInnerHTML={{
                  __html: detailVideogame.description,
                }}
              />
            
            </div>
          </div>
        ) : (
          <p>💥💥¡Disculpe las molestias, esto va a llevar un tiempo!💥💥</p>
        )}
      </div>
    </div>
  );
}

// style={{background: `url(${detailVideogame.background_image}) no-repeat`}}