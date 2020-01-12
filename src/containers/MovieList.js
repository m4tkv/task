import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as actionMovies from '../actions/movies';
import List from "../components/List";
import SearchBox from "../components/Search";
import {SEARCH_DEFAULT, SWITCH_BUTTON} from "../constants/actionTypes";
import Tags from "../components/Tags";


class MovieList extends Component {
    constructor(props) {
        super(props);
        this.props.onSearchDefault();
    }

    switchButton(showFavorites){
        localStorage.setItem('showFavorites', JSON.stringify(showFavorites));
        this.props.onSwitchButton(showFavorites)
    }
    render() {
        return (
            <div className={"main-container"}>
                <SearchBox/>
                <Tags/>
                <div className={"switch-buttons"}>
                    <button className={"switch-buttons__button button " + (this.props.showFavorites?"":"switch-buttons__button_active")}
                    onClick={()=>this.switchButton(false)}>
                        Все фильмы
                    </button>
                    <button className={"switch-buttons__button button " + (this.props.showFavorites?"switch-buttons__button_active":"")}
                            onClick={()=>this.switchButton(true)}>
                        Закладки
                    </button>
                </div>
                {!this.props.fetchingMovies&&!this.props.fetchingTags? (
                    <div>
                        <List/>
                    </div>
                ) : 'Загрузка'}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        fetchingMovies: state.moviesStore.fetchingMovies,
        movies: state.moviesStore.movies,
        step: state.moviesStore.step,
        showFavorites:state.favoritesStore.showFavorites,
        favoriteMovies: state.favoritesStore.favoriteMovies,
        fetchingTags: state.tagsStore.fetchingTags}
}

function mapDispatchToProps(dispatch) {

    return {
        actionMovies: bindActionCreators(actionMovies, dispatch),
        onSwitchButton:(showFavorites) => {
            dispatch({type:SWITCH_BUTTON,payload:showFavorites})
        },
        onSearchDefault:() => {
            dispatch({type:SEARCH_DEFAULT})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);