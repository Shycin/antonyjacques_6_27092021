import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import PropTypes from "prop-types";


const Routes = (props) =>{
    const { home } = props.urls
    return (
        <Router>
            <Switch>
                <Route exact path="/">{ home }</Route>
            </Switch>
        </Router>      
    )
}
export default Routes

Routes.propTypes = {
    urls: PropTypes.object,
};