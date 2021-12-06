import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from '../../client/src/components/LandingPage/LandingPage';
import Home from "../../client/src/components/Home/Home";
import { useDispatch } from 'react-redux';
import { getGenres } from '../src/actions/index';
import { useEffect } from "react";
import VideogameCreate from '../../client/src/components/VideogameCreate/VideogameCreate';
import Details from '../../client/src/components/Details/Details';


function App() {

  const dispatch = useDispatch();
 
  useEffect(()=> {
    dispatch (getGenres())
  },[dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/videogame" component={VideogameCreate} />
          <Route exact path="/home/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
