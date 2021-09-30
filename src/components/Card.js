import React , { Component } from 'react'
import PropTypes from "prop-types";

import ListTags from '../components/ListTags'

import '../css/card.scss';

export default class Card extends Component {

    constructor(props) {
        super(props);


    }

    onChange(field, value) {
        // parent class change handler is always called with field name and value
        this.setState({[field]: value});
        this.props.onChange(field, value);
    }
    
    render() {
        return (
            <article className={"card " + (this.props.photographer.tags.indexOf(this.props.selected) != -1 ? 'show' : 'hidden')}>
                <div><img src={'./img/author/' + this.props.photographer.portrait}></img></div>
                <h1></h1>
                {this.props.photographer.name}
                <ListTags selected={this.props.selected} onChange={this.onChange.bind(this)} tags={this.props.photographer.tags} />
            </article>
        );
    }
}


Card.propTypes = {
    selected: PropTypes.string,
    photographer: PropTypes.object,
    onChange: PropTypes.func,
};