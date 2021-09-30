import React , { Component } from 'react'
import PropTypes from "prop-types";

export default class Tag extends Component {

    constructor(props) {
        super(props);
    }

    
    capitalizeFirstLetter(string) {
        if(this.props.capitalize)
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return string   
    }
    
    render() {
        return (
            <li className="navigation__list__item">
                <button tag={'#'+ this.capitalizeFirstLetter(this.props.tag)} onClick={() => this.props.onClick() } className={"btn-categories " + (this.props.tag == this.props.selected ? 'selected' : 'not_selected')}>
                    {'#'+ this.capitalizeFirstLetter(this.props.tag)}
                </button>
            </li>
        );
    }
}


Tag.propTypes = {
    tag: PropTypes.string.isRequired,
    selected: PropTypes.string,
    onClick: PropTypes.func,
    capitalize: PropTypes.bool
};