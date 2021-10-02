import React , { useState } from 'react'
import PropTypes from "prop-types";

import json_data from '../data/site.json'
import Card from './Card'


import '../css/card.scss';
import '../css/tag.scss';


const ListCards = () => {
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
        return <Card key={i} photographer={photographer} />;
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
    selected: PropTypes.string,
    photographer: PropTypes.array,
    onChange: PropTypes.func,
};