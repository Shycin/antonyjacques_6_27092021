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
            <button onClick={() => this.props.onClick() } className={"btn-group " + (this.props.tag == this.props.selected ? 'red' : 'none')}>
                #{this.capitalizeFirstLetter(this.props.tag)}      
            </button>
        );
    }
}


Tag.propTypes = {
    tag: PropTypes.string.isRequired,
    selected: PropTypes.string,
    onClick: PropTypes.func,
    capitalize: PropTypes.bool
};