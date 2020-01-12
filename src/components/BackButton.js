import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class BackButton extends Component {

    render() {
        return (
            <div className={"back-button"}>
                <Link to={"/"} className={"back-button__link"}>
                    <i className="im im-angle-left"/> Назад
                </Link>
            </div>
        );
    }
}


export default BackButton;