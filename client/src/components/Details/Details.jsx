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
            <div className={styles.divSuper}>
              <div className={styles.divTitle}>
               <h1>{detailVideogame.name}</h1>
              </div>
              <br/>
              <br/>
              <div className={styles.divUl}>
                <div>
                  <h3>Genres</h3>
                  <ul>
                    {detailVideogame?.genres.map((g) => (
                      <li>{g.name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Platforms</h3>
                  <ul>
                    {detailVideogame.platforms.map((p) => (
                      <li>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.divRecargado}>
                  <div>
                    <h3>Released</h3>
                    <h5>{detailVideogame.released}</h5>
                  </div>
                  <div>
                    <h3>Rating</h3>
                    <h5>{detailVideogame.rating}</h5>
                  </div>
              </div>
            </div>
            <div className={styles.divAbout}> 
             <h1>About</h1> 
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