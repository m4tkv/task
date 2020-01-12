import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {COUNT_ELEMENTS} from "../constants/const";
import {NEXT_STEP} from "../constants/actionTypes";





class LoadMore extends Component {

    render() {
        return (
            <div className={"load-more"}>
                {(this.props.step * COUNT_ELEMENTS <= this.props.movies.length)?(
                    <button className={"load-more__button button button_main-active"}
                            onClick={()=>this.props.onChangeStep(this.props.step + 1)}>
                        Показать еще</button>
                ):false}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        movies:state.moviesStore.movies,
        step:state.moviesStore.step,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        onChangeStep: (step) => {
            dispatch({type:NEXT_STEP,payload:step})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadMore);