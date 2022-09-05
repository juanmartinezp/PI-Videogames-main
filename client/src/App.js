import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GameDetails from './components/GameDetails';
import Filters from './components/Filters';
import CreateGame from './components/CreateGame';
//import RoutesError from "./components/error/RoutesError";

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route exact path="/create">
        <CreateGame/>
      </Route>
      <Route exact path="/home">
        <Filters/>
      </Route>
      <Route exact path="/game/:id">
        <GameDetails/>
      </Route>
      <Route path="*">
      <RoutesError/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
