import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import moviesStore from './movies';
import favoritesStore from './favorites';
import tagsStore from './tags';
import searchStore from './search'

export default (history) => combineReducers({
    router: connectRouter(history),
    moviesStore,
    favoritesStore,
    tagsStore,
    searchStore
})