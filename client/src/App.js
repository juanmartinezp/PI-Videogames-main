import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GameDetails from './components/GameDetails';
import Home from './components/Home';
import CreateGame from './components/CreateGame';


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
          <Home/>
        </Route>
        <Route exact path="/game/:id">
          <GameDetails/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
