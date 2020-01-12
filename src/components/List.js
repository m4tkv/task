import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {COUNT_ELEMENTS} from "../constants/const";
import {Link} from "react-router-dom";
import LoadMore from "./LoadMore";
import {CHANGE_FAVORITE, CHANGE_SELECTED_TAGS} from "../constants/actionTypes";


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {qw: false}
    }

    addFavorite(item) {
        let favoriteArr = this.props.favoriteMovies.slice(0);
        favoriteArr.push(item);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteArr));
        this.props.onChangeFavorite(favoriteArr);
    }

    removeFavorite(item) {
        let key = this.props.favoriteMovies.indexOf(item);
        let favoriteArr = this.props.favoriteMovies.slice(0);
        favoriteArr.splice(key, 1);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteArr));
        this.props.onChangeFavorite(favoriteArr);
    }

    getFilteredValues(movies) {
        return movies.filter((movie) => {
            return !(this.props.tagsSelected.map((item) => {
                return movie.tags.some(tag => tag === item)
            }).some(item => item === false)) &&
                ((movie.title.indexOf(this.props.search) !== -1) || !this.props.showSearchResult);
        });
    }

    addTag(tagName) {
        let selectedTagsAttay = this.props.tagsSelected.slice(0);
        if (selectedTagsAttay.indexOf(tagName) === -1) {
            selectedTagsAttay.push(tagName);
            this.props.onChangeSelectedTags(selectedTagsAttay);
        }
        window.scrollTo(0, 0);
    }

    render() {
        let movies = null;
        if (this.props.showFavorites && !this.props.showSearchResult) {
            movies = this.props.favoriteMovies.slice(0);
        } else {
            movies = this.props.movies.slice(0);
        }
        movies = this.getFilteredValues(movies);
        return (
            <div className={"list"}>
                {movies.length > 0 ? (
                    <div>
                        {movies.slice(0, this.props.step * COUNT_ELEMENTS).map((item, key) => {
                            return <div key={key} className={"list__row"}>
                                <div className={"list__link-container"}>
                                    <Link to={"/film/" + key} className={"list__name"}>
                                        {item.title}
                                    </Link>
                                </div>
                                <div className={"list__tag-container"}>
                                {item.tags.map((elem, index) => {
                                    return <div key={index} className={"list__tag"} onClick={() => this.addTag(elem)}>
                                        #{elem}
                                    </div>
                                })}
                                </div>
                                <div className={"list__bookmark"} key={key}>
                                    {!this.props.favoriteMovies.some(e => e.title === item.title) ? (
                                        <img src={"/media/icons/bookmark-empty.svg"} alt={"bookmark-empty"}
                                             onClick={() => this.addFavorite(item)}/>
                                    ) : (
                                        <img src={"/media/icons/bookmark.svg"} alt={"bookmark"}
                                             onClick={() => this.removeFavorite(item)}/>
                                    )}
                                </div>
                            </div>

                        })}
                        {(this.props.step * COUNT_ELEMENTS <= movies.length) ? <LoadMore/> : false}
                    </div>
                ) : (
                    <div className={"list__error"}>
                        {this.props.showSearchResult ? "Фильмы не найдены" : "Фильмы в закладках отсутствуют, попробуйте их добавить"}
                    </div>
                )}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        movies: state.moviesStore.movies,
        step: state.moviesStore.step,
        showFavorites: state.favoritesStore.showFavorites,
        favoriteMovies: state.favoritesStore.favoriteMovies,
        tagsSelected: state.tagsStore.tagsSelected,
        search: state.searchStore.search,
        showSearchResult: state.searchStore.showSearchResult
    }
}

function mapDispatchToProps(dispatch) {

    return {
        onChangeFavorite: (favoriteArr) => {
            dispatch({type: CHANGE_FAVORITE, payload: favoriteArr})
        },
        onChangeSelectedTags: (tagsSelected) => {
            dispatch({type: CHANGE_SELECTED_TAGS, payload: tagsSelected})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);