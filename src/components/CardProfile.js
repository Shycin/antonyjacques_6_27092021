import React , { useContext } from 'react'
import PropTypes from "prop-types"
import { ContextComponent } from '../Provider'
import Contact from '../components/Contact'


import ListTags from '../components/ListTags'


const CardProfile = ({photographer}) => {
    const { selected } = useContext(ContextComponent)

    return (
        <article className={"photographers__card card " + ( selected != "default" ? (photographer.tags.indexOf(selected) != -1 ? 'show' : 'hidden') : '' )}>
            <div className="card__content">
                <h1 className="card__content__name">
                    {photographer.name}
                </h1>
                <div className="card__content__location">{photographer.city + ", " + photographer.country}</div>
                <p className="card__content__description">{photographer.tagline}</p>
                <div className="card__content__price">{photographer.price}€/jour</div>
                <div className="card__categories">
                    <ListTags tags={photographer.tags} />
                </div>
            </div>
            <div className="card__contact">
                <Contact photographerID={photographer.id}/>
            </div>
            <figure className="card__icon">
                <img alt={photographer.name} src={'../img/author/' + photographer.portrait}></img>
            </figure>
        </article> 
    )
}
export default CardProfile

CardProfile.propTypes = {
    selected: PropTypes.string,
    photographer: PropTypes.object,
    contact: PropTypes.object,
};