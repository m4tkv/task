import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {CHANGE_SELECTED_TAGS} from "../constants/actionTypes";


class Tags extends Component {

    addTags(index) {
        let selectedTagsAttay = this.props.tagsSelected.slice(0);
        selectedTagsAttay.push(this.props.tags[index]);
        this.props.onChangeSelectedTags(selectedTagsAttay);
    }

    removeTags(index) {
        let key = this.props.tagsSelected.indexOf(this.props.tags[index]);
        let selectedTagsAttay = this.props.tagsSelected.slice(0);
        selectedTagsAttay.splice(key, 1);
        this.props.onChangeSelectedTags(selectedTagsAttay);
    }

    render() {
        return (
            <div className={"tags"}>
                <div className={"tags__searching-tags"}>
                    {this.props.tagsSelected.map((item, index) => {
                        return <div key={index} className={"tags__tag"} onClick={() => this.removeTags(index)}>
                            <img src={"/media/icons/close.svg"} className={"tags__close"} alt={"close"}/>
                            #{item}
                        </div>
                    })}
                </div>
                <div className={"tags__header"}>
                    Список тегов
                </div>
                <div className={"tags__list"}>
                    {this.props.tags.map((item, index) => {
                        return !this.props.tagsSelected.some(e => e === item) ? (
                            <div key={index} className={"tags__tag"} onClick={() => this.addTags(index)}>
                                #{item}
                            </div>
                        ) : (false)
                    })}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        tags: state.tagsStore.tags,
        tagsSelected: state.tagsStore.tagsSelected
    }
}

function mapDispatchToProps(dispatch) {

    return {
        onChangeSelectedTags: (tagsSelected) => {
            dispatch({type: CHANGE_SELECTED_TAGS, payload: tagsSelected})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);