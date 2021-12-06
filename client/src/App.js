import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import { useDispatch } from 'react-redux';
import { getGenres } from './actions/index';
import { useEffect } from "react";
import VideogameCreate from './components/VideogameCreate';
import Details from './components/Details';


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
