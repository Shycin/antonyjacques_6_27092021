/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import React, { Component } from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"

export default class Routes extends Component {
    render() {
        const { home } = this.props.urls
        return (
            <Router>
                <Switch>
                    <Route exact path="/" children={home} />
                </Switch>
            </Router>
        )
    }
}