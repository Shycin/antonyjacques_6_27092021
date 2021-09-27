import React , { Component } from 'react'
import {
    withRouter,
} from "react-router-dom"

import logo from '../img/logo.png'

import Tags from '../components/Tags'


class Header extends Component {
    render(){
        return (
            <header>
                <div><img src={logo} alt="Logo" /></div>
                <Tags />
            </header>
        )
    }
}

const banner = withRouter(Header)
export default banner