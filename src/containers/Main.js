import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import connect from "react-redux/es/connect/connect";
import MovieList from "./MovieList";
import MovieCart from "../components/MovieCart";
import * as actionMovies from '../actions/movies';
import * as actionTags from '../actions/tags';
import {bindActionCreators} from "redux";
import SearchResult from "./SearchResult";





class Main extends Component {
    constructor(props){
        super(props);
        this.props.actionMovies.getMovies();
        this.props.actionTags.getTags();
    }
    render() {
        return (
            <div className={"container"}>
                <Switch>
                    <Route path={"/film/:id"} component={MovieCart}/>
                    <Route path={"/search-result"} component={SearchResult}/>
                    <Route path={"/"} component={MovieList}/>
                </Switch>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {

    return {
        actionMovies: bindActionCreators(actionMovies, dispatch),
        actionTags: bindActionCreators(actionTags, dispatch),
    }
}

export default connect(false, mapDispatchToProps)(Main);