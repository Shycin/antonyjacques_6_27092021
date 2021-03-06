import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ContextOpenModalContextProvider } from '../context/openModal'
import { selectContext } from '../selectContext'
import Contact from './Contact'
import ListTags from './ListTags'

const CardProfile = ({ photographer }) => {
  const { setSelected } = useContext(selectContext)

  useEffect(() => {
    setSelected('default')
  }, [])

  return (
    <article className='photographers__card card'>
      <div className='card__content'>
        <h1 className='card__content__name'>{photographer.name}</h1>
        <div className='card__content__location'>
          {`${photographer.city}, ${photographer.country}`}
        </div>
        <p className='card__content__description'>{photographer.tagline}</p>
        <div className='card__categories'>
          <Link tabIndex='-1' to='/'>
            <ListTags tags={photographer.tags} />
          </Link>
        </div>
      </div>
      <div className='card__contact'>
        <ContextOpenModalContextProvider>
          <Contact photographer={photographer} />
        </ContextOpenModalContextProvider>
      </div>
      <figure className='card__icon'>
        <img
          alt={photographer.name}
          src={`../img/author/${photographer.portrait}`}
        />
      </figure>
    </article>
  )
}
export default CardProfile

CardProfile.propTypes = {
  photographer: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ])
  ).isRequired,
}
