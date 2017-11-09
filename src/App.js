import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';


import HomePage from './pages/home';
import SinglePage from './pages/single';
import error404Page from './pages/404';

class App extends Component {



  render() {


    return (
      <Router>
        <div>
          <Route path="/:id" component={SinglePage} />
          <Route path="/404" component={error404Page}/>
          <Route exact path="/" component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
