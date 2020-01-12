import React, {Component} from 'react';
import {history} from "../store/configureStore";
import {CHANGE_SEARCH, SHOW_SEARCH_RESULT} from "../constants/actionTypes";
import connect from "react-redux/es/connect/connect";


class SearchBox extends Component {


    onSearch(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onSearch();
        history.push('/search-result');
    }
    render() {
        return (
            <form className={"search"} onSubmit={(e) => this.onSearch(e)}>
                <input className={"search__input input"} placeholder={"Поиск..."} value={this.props.search}
                onChange={(e) => this.props.onChangeSearch(e.target.value)}/>
                <button type={"button"} className={"search__button button"} onClick={(e) => this.onSearch(e)}><i className="im im-magnifier"/></button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        search: state.searchStore.search
    }
}

function mapDispatchToProps(dispatch) {

    return {
        onChangeSearch:(search) => {
            dispatch({type:CHANGE_SEARCH,payload:search})
        },
        onSearch:() => {
            dispatch({type:SHOW_SEARCH_RESULT})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);