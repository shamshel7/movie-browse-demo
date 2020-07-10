import React, {Component} from 'react';
import {Router, browserHistory} from 'react-router';
import { Link, Route, Switch } from "react-router-dom";
import Main from './Main';
import Details from './Details';
import Watch from './Watch';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            a: 1
        }
    }

    render() {
        return (
            <div>
                <Route exact={true} path="/" component={Main} />
                <Route path="/details/:type/:id" component={Details} />
                <Route path="/watch/:id" component={Watch} />
            </div>
        )
    }
}

export default App;