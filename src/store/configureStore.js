import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';


export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                thunk,
            ),
        ),
    );
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}