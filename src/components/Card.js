import React , { useContext } from 'react'
import PropTypes from "prop-types"
import { ContextComponent } from '../Provider'


import ListTags from '../components/ListTags'


const Card = ({photographer}) => {
    const { selected } = useContext(ContextComponent)

    return (
        <article className={"photographers__card card " + ( selected != "default" ? (photographer.tags.indexOf(selected) != -1 ? 'show' : 'hidden') : '' )}>
            <figure className="card__icon">
                <img src={'../img/author/' + photographer.portrait}></img>
            </figure>
            <h2 className="card__name">
                {photographer.name}
            </h2>
            <div className="card__content">
                <div className="card__content__location">{photographer.city + ", " + photographer.country}</div>
                <p className="card__content__description">{photographer.tagline}</p>
                <div className="card__content__price">{photographer.price}€/jour</div>
            </div>
            <div className="card__categories">
                <ListTags tags={photographer.tags} />
            </div>
        </article> 
    )
}
export default Card

Card.propTypes = {
    selected: PropTypes.string,
    photographer: PropTypes.object,
    onChange: PropTypes.func,
};