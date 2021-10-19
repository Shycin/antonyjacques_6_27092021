/* eslint-disable no-use-before-define */
/* eslint-disable spaced-comment */
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import { useUID } from 'react-uid'
import { filtreImageContext } from '../context/filtreImageContext'
import '../css/contentprofile.scss'
import jsonData from '../data/site.json'
import '../fontAwesome/css/all.min.css'
import ListBox from './ListBox'

const ContentProfile = ({ photographer }) => {
  const { filtreImageSelected } = useContext(filtreImageContext)
  const [liked, setLiked] = useState([])
  const medias = []

  const verificationEvent = (e) =>
    e.keyCode === 32 ||
    e.key === ' ' ||
    e.code === 'Space' ||
    e.keyCode === 13 ||
    e.key === 'Enter' ||
    e.code === 'Enter'

  const removeItem = (item) => {
    setLiked(liked.filter((each) => each !== item))
  }

  const toggleArrayItem = (item) => {
    if (liked.indexOf(item) >= 0) {
      removeItem(item)
    } else {
      setLiked([...liked, item])
    }
  }

  // function to retrieve all product
  const initializeAllProduct = () => {
    jsonData.media.map((media) => {
      if (media.photographerId === photographer.id) {
        medias.push(media)
      }
      return true
    })
  }
  initializeAllProduct()

  const renderImage = (media) => (
    <div className='product__content__item__image'>
      {media.image ? (
        <img alt={media.alt} src={`../img/${photographer.id}/${media.image}`} />
      ) : (
        <video muted>
          <source
            src={`../img/${photographer.id}/${media.video}`}
            type='video/mp4'
          />
        </video>
      )}
    </div>
  )

  const renderItem = (filterSelect) => {
    let arrayRender = medias
    // var reverse = order == 'ASC' ? 1 : -1;
    let reverse = -1

    switch (filterSelect) {
      case 'popular':
        arrayRender = arrayRender.sort(
          (a, b) => reverse * ((a.likes > b.likes) - (b.likes > a.likes))
        )
        break

      case 'date':
        arrayRender = arrayRender.sort(
          (a, b) =>
            reverse *
            ((new Date(a.date) > new Date(b.date)) -
              (new Date(b.date) > new Date(a.date)))
        )
        break

      case 'title':
        reverse = 1
        arrayRender = arrayRender.sort(
          (a, b) => reverse * ((a.title > b.title) - (b.title > a.title))
        )
        break

      default:
        break
    }

    return arrayRender.map((media, i) => (
      <div key={useUID(media, i)} className='product__content__item'>
        {renderImage(media)}
        <div className='product__content__item__description'>
          <div className='product__content__item__description__title'>
            <h2>{media.title}</h2>
          </div>
          <div
            className={
              liked.indexOf(i) >= 0
                ? 'product__content__item__description__likes liked'
                : 'product__content__item__description__likes'
            }
            tabIndex={0}
            role='button'
            onKeyPress={(e) => {
              if (verificationEvent(e)) {
                toggleArrayItem(i)
              }
            }}
            onClick={() => toggleArrayItem(i)}>
            <p id='order_label'>{media.likes}</p>{' '}
            <button
              type='button'
              aria-label='likes'
              className='fas fa-heart icon'
            />
          </div>
        </div>
      </div>
    ))
  }

  return (
    <section className='product'>
      <div className='product__filter'>
        <p>Trier par</p>
        <ListBox />
      </div>
      <div className='product__content'>{renderItem(filtreImageSelected)}</div>
    </section>
  )
}
export default ContentProfile

ContentProfile.propTypes = {
  photographer: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ])
  ).isRequired,
}
