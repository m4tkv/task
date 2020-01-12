import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import BackButton from "./BackButton";
import {CHANGE_FAVORITE} from "../constants/actionTypes";


class MovieCart extends Component {

    addFavorite(){
        let favoriteArr = this.props.favoriteMovies.slice(0);
        favoriteArr.push(this.props.movies[this.props.match.params.id]);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteArr));
        this.props.onChangeFavorite(favoriteArr);
    }

    removeFavorite(){
        let favoriteArr = this.props.favoriteMovies.slice(0);
        let movie = this.props.movies[this.props.match.params.id];
        let movieFavoriteKey = this.props.favoriteMovies.indexOf(movie);
        if (movieFavoriteKey !== -1){
            favoriteArr.splice(movieFavoriteKey,1);
            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteArr));
            this.props.onChangeFavorite(favoriteArr);
        }
    }
    render() {
        return (
            <div>
                <BackButton/>
                <div className={"cart"}>
                    <div className={"cart__image"}/>
                    <div className={"cart__data"}>
                        <div className={"cart__name"}>
                            {this.props.movies[this.props.match.params.id].title}
                        </div>
                        {!this.props.favoriteMovies.some(e => e.title === this.props.movies[this.props.match.params.id].title)?(
                            <button className={"cart__button button button_main-active"}
                            onClick={()=>this.addFavorite()}>
                                Добавить в закладки
                            </button>
                        ):(
                            <button className={"cart__button button button_main"}
                            onClick={()=>this.removeFavorite()}>
                                Удалить с закладок
                            </button>
                        )}
                    </div>
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
        favoriteMovies:state.favoritesStore.favoriteMovies
    }
}

function mapDispatchToProps(dispatch) {

    return {
        onChangeFavorite: (favoriteArr) => {
            dispatch({type: CHANGE_FAVORITE, payload: favoriteArr});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCart);