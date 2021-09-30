import React, { Component } from 'react'
import PropTypes from "prop-types";


import logo from '../img/logo.png'


import '../css/header.scss';


export default class Header extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <header>
                <div><img src={logo} alt="Logo" /></div>
                {this.props.children}
            </header>
        )
    }
}

Header.propTypes = {
    children: PropTypes.array
};
