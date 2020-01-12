import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App';
import {Provider} from 'react-redux'
import {Route, Switch} from 'react-router' // react-router v4
import {ConnectedRouter} from 'connected-react-router'
import configureStore, {history} from './store/configureStore'


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path='/' component={App}/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);