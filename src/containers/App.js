import React, {Component} from 'react';
import {Route, Switch} from 'react-router'
import Main from "./Main";
import '../style/style.scss';


class App extends Component {

    render() {
        return (
            <Switch>
                <Route path="/" component={Main}/>
            </Switch>
        );
    }
}


export default App;