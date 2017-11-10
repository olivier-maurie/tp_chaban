import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import HomePage from './pages/home';
import SinglePage from './pages/single';
import error404Page from './pages/not-found';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/:id" component={SinglePage} />

                        <Route exact path="/page/not-found" component={error404Page}/>
                        <Redirect to="/page/not-found"/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
