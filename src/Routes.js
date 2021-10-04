import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import PropTypes from "prop-types";


const Routes = (props) =>{
    const { home, photographerpage } = props.urls
    return (
        <Router>
            <Switch>
                <Route exact path="/">{ home }</Route>
                <Route path="/photographer-page/:photographerID">{ photographerpage }</Route>
            </Switch>
        </Router>      
    )
}
export default Routes

Routes.propTypes = {
    urls: PropTypes.object,
};