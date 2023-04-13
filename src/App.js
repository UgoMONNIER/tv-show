import './App.css';
import React, {useEffect } from 'react';
import TVShowListPage from './components/TVShowListPage'
import MyList from './components/MyList'
import Menu from './components/Menu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import useLocation from react-router-dom

function App() {



  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Menu/>
          <Switch>
            <Route path="/my-list" component={MyList} />
            <Route exact path="/" component={TVShowListPage} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
