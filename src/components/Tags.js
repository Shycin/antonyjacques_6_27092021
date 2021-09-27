import React , { Component } from 'react'
import PropTypes from "prop-types";

import json_data from '../data/site.json'

export default class Tags extends Component {

    constructor(props) {    
        super(props);    

        if(this.props.tags.length == 0)
        {
            this.initialize_all_tags();
        }

       
    }

    initialize_all_tags()
    {
        json_data.photographers.map(
            photographer => {
                photographer.tags.map(
                    (tag) => { 
                        this.props.tags.indexOf(this.capitalizeFirstLetter(tag)) === -1 ? this.props.tags.push(this.capitalizeFirstLetter(tag)) : null 
                    }
                ) 
            }
        );
    }


    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    render(){
        return <>
            <h1>Tags</h1>
            <ul>
                { 
                    this.props.tags.map(
                        (tag, i) => <li key={i}>#{ tag }</li>
                    ) 
                }
            </ul>
        </>
    }
}

Tags.propTypes = {
    tags: PropTypes.array.isRequired,
};

Tags.defaultProps = {
    tags: [] 
};