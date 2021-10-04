import React , { useContext, useEffect } from 'react'
import PropTypes from "prop-types"
import { ContextComponent } from '../Provider'
import { Link } from 'react-router-dom'

import Contact from '../components/Contact'
import ListTags from '../components/ListTags'


const CardProfile = ({photographer}) => {
    const { setSelected } = useContext(ContextComponent)
    
    useEffect(() => {
        setSelected('default')
    }, []);

    return (
        <article className={"photographers__card card"}>
            <div className="card__content">
                <h1 className="card__content__name">
                    {photographer.name}
                </h1>
                <div className="card__content__location">{photographer.city + ", " + photographer.country}</div>
                <p className="card__content__description">{photographer.tagline}</p>
                <div className="card__categories">
                    <Link to={"/"}>
                        <ListTags tags={photographer.tags} />
                    </Link>
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