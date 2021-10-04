import React , { useState } from 'react'
import PropTypes from "prop-types";

import json_data from '../data/site.json'
import Card from './Card'
import CardProfile from './CardProfile'


import '../css/card.scss';
import '../css/tag.scss';


const ListCards = ({photographerID = 0}) => {
    const [photographers] = useState([])
    const [photographers_name] = useState([])

    // function to retrieve all photographer if no photographers parameter
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
        if(photographerID === 0)
        {
            return <Card key={i} photographer={photographer}></Card>;
        }
        else if(photographerID == photographer.id)
        {
            return <CardProfile key={i} photographer={photographer}/>
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
    photographerID: PropTypes.string,
    selected: PropTypes.string,
    photographer: PropTypes.array,
};