import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import { useDispatch } from 'react-redux';
import { getGenres } from './actions/index';
import { useEffect } from "react";



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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
