import React , { Component } from 'react'
import PropTypes from "prop-types";


import json_data from '../data/site.json'
import Tag from './Tag'


import '../css/tag.scss';


export default class ListTags extends Component {

    constructor(props) {    
        super(props);    

        this.state = {
            selected: "default",
        };

        if(this.props.tags.length == 0)
        {
            this.initialize_all_tags();
        } 
    }

    //Event when Tag is clicked
    handleClick(tag) 
    {    
        this.setState({selected: tag});  

        this.props.onChange('selected', tag);
    }

    
    // function to retrieve all tags if no tags parameter
    initialize_all_tags()
    {
        json_data.photographers.map(
            photographer => {
                photographer.tags.map(
                    (tag) => { 
                        this.props.tags.indexOf(tag) === -1 ? this.props.tags.push(tag) : null 
                    }
                ) 
            }
        );
    }


    renderTag(tag,i) 
    {
        return <Tag key={i} selected={this.props.selected} tag={tag} onClick={() => this.handleClick(tag) } capitalize={this.props.parameter.FirstLetter}/>;
    }

    render(){
        return <>
            <nav className="navigation">
                <ul className="navigation__list">
                    { 
                        this.props.tags.map(
                            (tag,i) => this.renderTag(tag, i)
                        ) 
                    }
                </ul>
            </nav>    
        </>
    }
}

ListTags.propTypes = {
    tags: PropTypes.array.isRequired,
    selected: PropTypes.string,
    onChange: PropTypes.func,
    parameter: PropTypes.object
};

ListTags.defaultProps = {
    tags: [],
    parameter: {}
};