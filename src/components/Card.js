import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { selectContext } from '../Provider'
import ListTags from './ListTags'

const Card = ({ photographer }) => {
  const { selected } = useContext(selectContext)

  const hideOrShow = () => {
    if (selected !== 'default') {
      return photographer.tags.indexOf(selected) !== -1 ? 'show' : ''
    }

    return 'hidden'
  }

  return (
    <article
      className={`photographers__card card ${hideOrShow}
      `}>
      <div className='card__header'>
        <Link to={`/photographer-page/${photographer.id}`}>
          <figure className='card__header__icon'>
            <img
              alt={photographer.name}
              src={`../img/author/${photographer.portrait}`}
            />
          </figure>
          <h2 className='card__header__name'>{photographer.name}</h2>
        </Link>
      </div>
      <div className='card__content'>
        <div className='card__content__location'>
          {`${photographer.city}, ${photographer.country}`}
        </div>
        <p className='card__content__description'>{photographer.tagline}</p>
        <div className='card__content__price'>{photographer.price}€/jour</div>
      </div>
      <div className='card__categories'>
        <ListTags tags={photographer.tags} />
      </div>
    </article>
  )
}
export default Card

Card.propTypes = {
  photographer: PropTypes.objectOf.isRequired,
}
