import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as actionMovies from '../actions/movies';
import List from "../components/List";
import SearchBox from "../components/Search";
import {SWITCH_BUTTON} from "../constants/actionTypes";
import Tags from "../components/Tags";
import BackButton from "../components/BackButton";


class SearchResult extends Component {

    render() {
        return (
            <div>
                <BackButton/>
                <div className={"main-container"}>
                    <SearchBox/>
                    <Tags/>
                    {!this.props.fetchingMovies && !this.props.fetchingTags ? (
                        <div>
                            <div className={"search-header"}>
                                Результаты поиска
                            </div>
                            <List/>
                        </div>
                    ) : 'Загрузка'}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        fetchingMovies: state.moviesStore.fetchingMovies,
        movies: state.moviesStore.movies,
        step: state.moviesStore.step,
        showFavorites: state.favoritesStore.showFavorites,
        favoriteMovies: state.favoritesStore.favoriteMovies,
        fetchingTags: state.tagsStore.fetchingTags
    }
}

function mapDispatchToProps(dispatch) {

    return {
        actionMovies: bindActionCreators(actionMovies, dispatch),
        onSwitchButton: (showFavorites) => {
            dispatch({type: SWITCH_BUTTON, payload: showFavorites})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);