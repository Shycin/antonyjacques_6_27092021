import React , { Component } from 'react'
import PropTypes from "prop-types";


import ListTags from '../components/ListTags'



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
            <article className={"photographers__card card " + (this.props.photographer.tags.indexOf(this.props.selected) != -1 ? 'show' : 'hidden')}>
                <figure className="card__icon">
                    <img src={'./img/author/' + this.props.photographer.portrait}></img>
                </figure>
                <h2 className="card__name">
                    {this.props.photographer.name}
                </h2>
                <div className="card__content">
                    <div className="card__content__location">{this.props.photographer.city + ", " + this.props.photographer.country}</div>
                    <p className="card__content__description">{this.props.photographer.tagline}</p>
                    <div className="card__content__price">{this.props.photographer.price}€/jour</div>
                </div>
                <div className="card__categories">
                    <ListTags selected={this.props.selected} onChange={this.onChange.bind(this)} tags={this.props.photographer.tags} />
                </div>
            </article>
        );
    }
}


Card.propTypes = {
    selected: PropTypes.string,
    photographer: PropTypes.object,
    onChange: PropTypes.func,
};