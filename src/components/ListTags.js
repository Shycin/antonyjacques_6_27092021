import React from 'react'
import PropTypes from "prop-types";


import json_data from '../data/site.json'
import Tag from './Tag'


import '../css/tag.scss';

const ListTags = ({tags, parameter}) => {

    // function to retrieve all tags if no tags parameter
    const initialize_all_tags = () => {
        if(tags.length == 0 || tags.length == null)
        {
            json_data.photographers.map(
                photographer => {
                    photographer.tags.map(
                        (tag) => { 
                            tags.indexOf(tag) === -1 ? tags.push(tag) : null 
                        }
                    ) 
                }
            );
        }
    }
    initialize_all_tags()

    const renderTag = (tag, i) => {
        return <Tag key={i} tag={tag} capitalize={parameter.FirstLetter}/>;
    }

    return (
        <>
            <nav className="navigation">
                <ul className="navigation__list">
                    { 
                        tags.map(
                            (tag,i) => renderTag(tag, i)
                        ) 
                    }
                </ul>
            </nav>    
        </>
    )
}
export default ListTags


ListTags.propTypes = {
    tags: PropTypes.array.isRequired,
    FirstLetter: PropTypes.bool,
    selected: PropTypes.string,
    onChange: PropTypes.func,
    parameter: PropTypes.object
};

ListTags.defaultProps = {
    tags: [],
    parameter: {}
};