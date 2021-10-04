import React , { useState } from 'react'
import PropTypes from "prop-types";

import json_data from '../data/site.json'
import Card from './Card'


import '../css/card.scss';
import '../css/tag.scss';


const ListCards = ({target = []}) => {
    const [photographers] = useState([])
    const [photographers_name] = useState([])

    // function to retrieve all tags if no tags parameter
    const initialize_all_photographer = () => {
        json_data.photographers.map(
            photographer => {
                if(photographers_name.indexOf(photographer.name) === -1)
                {
                    photographers.push(photographer)
                    photographers_name.push(photographer.name)
                }
            }
        );
    }
    initialize_all_photographer()

    const renderCard = (photographer, i) => {
        if(target.indexOf(''+photographer.id) != -1 || target.length == 0)
        {
            return <Card key={i} photographer={photographer} />;
        }

        return null
    }

    return (
        <section className="photographers">
        {
            photographers.map(
                (photographer,i) => renderCard(photographer, i)
            )
        }
        </section>  
    )
}
export default ListCards

ListCards.propTypes = {
    target: PropTypes.array,
    selected: PropTypes.string,
    photographer: PropTypes.array,
    onChange: PropTypes.func,
};