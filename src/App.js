import './App.css';
import React, { useEffect } from "react";
import TVShowListPage from './components/TVShowListPage';
import Suggestion from './components/Suggestion';
import MyList from './components/MyList';
import Menu from './components/Menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {


  useEffect(() => {
    console.log(window)
  }, []); 

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Menu /> 
          <Switch>
            <Route exact path="/my-list" component={MyList} />
            <Route exact path="/suggestion" component={Suggestion} />
            <Route exact path="/" component={TVShowListPage} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
