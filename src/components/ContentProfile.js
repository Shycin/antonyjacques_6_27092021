import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { useUID } from 'react-uid'
import { filtreImageContext } from '../context/filtreImageContext'
import { imageLikedContext } from '../context/imageLiked'
import '../css/contentprofile.scss'
import jsonData from '../data/site.json'
import '../fontAwesome/css/all.min.css'
import ListBox from './ListBox'

const ContentProfile = ({ photographer }) => {
  const { totalLikes, setTotalLikes } = useContext(imageLikedContext)
  const { filtreImageSelected } = useContext(filtreImageContext)
  const [medias, setMedias] = useState(
    jsonData.media
      .map((media) => (media.photographerId === photographer.id ? media : null))
      .filter((x) => x !== null)
  )

  useEffect(() => {
    let ret = 0
    medias.forEach((element) => {
      ret += element.likes
    })
    setTotalLikes(ret)
  }, [])

  const verificationEvent = (e) =>
    e.keyCode === 32 ||
    e.key === ' ' ||
    e.code === 'Space' ||
    e.keyCode === 13 ||
    e.key === 'Enter' ||
    e.code === 'Enter'

  const toggleArrayItem = (e, index) => {
    const current = medias[index]

    if (current.liked) {
      setTotalLikes(totalLikes - 1)
      current.likes -= 1
      current.liked = false
    } else {
      setTotalLikes(totalLikes + 1)
      current.likes += 1
      current.liked = true
    }

    const newMedia = [
      ...medias.slice(0, index),
      current,
      ...medias.slice(index + 1),
    ]
    setMedias(newMedia)
  }

  const applyFilter = () => {
    let arrayRender = medias
    // var reverse = order == 'ASC' ? 1 : -1;
    let reverse = -1

    switch (filtreImageSelected) {
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
    if (arrayRender !== medias) setMedias(arrayRender)
  }

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

  const renderItem = () => {
    applyFilter()
    return medias.map((media, i) => (
      <div key={useUID(media, i)} className='product__content__item'>
        {renderImage(media)}
        <div className='product__content__item__description'>
          <div className='product__content__item__description__title'>
            <h2>{media.title}</h2>
          </div>
          <div
            className={
              media.liked
                ? 'product__content__item__description__likes liked'
                : 'product__content__item__description__likes'
            }
            tabIndex={0}
            role='button'
            onKeyPress={(e) => {
              if (verificationEvent(e)) {
                toggleArrayItem(e, i)
              }
            }}
            onClick={(e) => toggleArrayItem(e, i)}>
            <p className='nbLike'>{media.likes}</p>
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
        <p id='order_label'>Trier par</p>
        <ListBox />
      </div>
      <div className='product__content'>{renderItem(medias)}</div>
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
