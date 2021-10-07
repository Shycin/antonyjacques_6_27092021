import PropTypes from "prop-types"
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ListTags from '../components/ListTags'
import { ContextComponent } from '../Provider'




const Card = ({photographer}) => {
    const { selected } = useContext(ContextComponent);

    return (
        <article className={"photographers__card card " + ( selected != "default" ? (photographer.tags.indexOf(selected) != -1 ? 'show' : 'hidden') : '' )}>
            <div className="card__header">
                <Link to={"/photographer-page/" + photographer.id}>
                    <figure className="card__header__icon">
                        <img alt={photographer.name} src={'../img/author/' + photographer.portrait}></img>
                    </figure>
                    <h2 className="card__header__name">
                        {photographer.name}
                    </h2>
                </Link>
            </div>
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
    contact: PropTypes.object,
};