import React , { Component } from 'react'
import PropTypes from "prop-types";

import json_data from '../data/site.json'
import Card from './Card'


import '../css/card.scss';


export default class ListCards extends Component {

    constructor(props) {    
        super(props);    

        this.state = {
            photographers: []
        };

        this.initialize_all_photographer();
    }


    // function to retrieve all tags if no tags parameter
    initialize_all_photographer()
    {
        json_data.photographers.map(
            photographer => {
                this.state.photographers.push(photographer) 
            }
        );
    }

    onChange(field, value) {
        // parent class change handler is always called with field name and value
        this.setState({[field]: value});
        this.props.onChange(field, value);
    }


    renderCard(photographer,i) 
    {
        return <Card key={i} photographer={photographer} selected={this.props.selected} onChange={this.onChange.bind(this)}/>;
    }

    render(){
        return <>
            <section className="photographers">
            {
                this.state.photographers.map(
                    (photographer,i) => this.renderCard(photographer, i)
                )
            }
            </section>
        </>
    }
}


ListCards.propTypes = {
    selected: PropTypes.string,
    photographer: PropTypes.array,
    onChange: PropTypes.func,
};