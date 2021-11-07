/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { useUID } from 'react-uid'
import { filtreImageContext } from '../context/filtreImageContext'
import { imageLikedContext } from '../context/imageLiked'
import '../css/contentprofile.scss'
import '../css/lightbox.scss'
import jsonData from '../data/site.json'
import '../fontAwesome/css/all.min.css'
import ListBox from './ListBox'

const ContentProfile = ({ photographer }) => {
  const { totalLikes, setTotalLikes } = useContext(imageLikedContext)
  const { filtreImageSelected } = useContext(filtreImageContext)
  const [lightbox, setLightbox] = useState(null)
  const [indexlightbox, setIndexlightbox] = useState(null)
  const [lastdirection, setLastDirection] = useState(null)
  const [medias, setMedias] = useState(
    jsonData.media
      .map((media) => (media.photographerId === photographer.id ? media : null))
      .filter((x) => x !== null)
  )

  function checkTabPress(e) {
    // pick passed event or global event object if passed one is empty
    let activeElement
    if (e.keyCode === 9 && lightbox === 'lightbox') {
      // Here read the active selected link.
      activeElement = document.activeElement
      // If HTML element is an anchor <a>
      if (activeElement.hasAttribute('firstbox') && e.shiftKey) {
        document
          .querySelectorAll('.product__content__item--show *[lastbox]')[0]
          .focus()
        e.stopPropagation()
        e.preventDefault()
      } else if (activeElement.hasAttribute('lastbox') && e.shiftKey) {
        document
          .querySelectorAll(
            '.product__content__item--show .fa-chevron-right'
          )[0]
          .focus()
        e.stopPropagation()
        e.preventDefault()
      } else if (activeElement.hasAttribute('lastbox')) {
        document
          .querySelectorAll('.product__content__item--show *[firstbox]')[0]
          .focus()
        e.stopPropagation()
        e.preventDefault()
      } else if (
        !(
          activeElement.hasAttribute('tabIndex') &&
          parseInt(activeElement.attributes.tabIndex.nodeValue, 10) >= 50 &&
          parseInt(activeElement.attributes.tabIndex.nodeValue, 10) < 60
        ) ||
        activeElement.hasAttribute('lastbox')
      ) {
        document
          .querySelectorAll(
            '.product__content__item--show .fa-chevron-right'
          )[0]
          .focus()
        e.stopPropagation()
        e.preventDefault()
      }
    }
  }

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
    console.log(e)
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

  const body = document.querySelector('body')
  useEffect(() => {
    body.addEventListener('keydown', checkTabPress, true)

    // re focus after lightbox was disable
    if (lightbox !== 'lightbox' && indexlightbox !== null) {
      document
        .getElementsByClassName('product__content__item')
        [indexlightbox].querySelectorAll('*[tabindex]')[0]
        .focus()

      setIndexlightbox(null)
    }

    return () => body.removeEventListener('keydown', checkTabPress, true)
  }, [lightbox])

  const openLightBox = (key) => {
    if (lightbox === null) {
      setIndexlightbox(key)
      setLightbox('lightbox')
    }
  }

  const closeLightBox = () => {
    if (lightbox !== '') {
      setLightbox(null)
      // setIndexlightbox(null)

      document
        .getElementsByClassName('product__content__item--show')[0]
        .classList.toggle('product__content__item')

      document
        .getElementsByClassName('product__content__item--show')[0]
        .classList.toggle('product__content__item--show')
    }
  }

  const changeIndexLightBox = (number) => {
    document
      .getElementsByClassName('product__content__item--show')[0]
      .classList.toggle('product__content__item')

    document
      .getElementsByClassName('product__content__item--show')[0]
      .classList.toggle('product__content__item--show')

    if (indexlightbox + number < 0) {
      setIndexlightbox(
        document.getElementsByClassName('product__content__item').length - 1
      )
    } else if (
      document.getElementsByClassName('product__content__item').length - 1 <
      indexlightbox + number
    ) {
      setIndexlightbox(0)
    } else {
      setIndexlightbox(indexlightbox + number)
    }

    if (number > 0) {
      setLastDirection('right')
    } else {
      setLastDirection('left')
    }
  }

  useEffect(() => {
    if (indexlightbox !== null) {
      document
        .getElementsByClassName('product__content__item')
        [indexlightbox].classList.toggle('product__content__item--show')
      document
        .getElementsByClassName('product__content__item')
        [indexlightbox].classList.toggle('product__content__item')

      if (lastdirection === 'right') {
        document
          .querySelectorAll(
            '.product__content__item--show .fa-chevron-right'
          )[0]
          .focus()
      } else {
        document
          .querySelectorAll('.product__content__item--show .fa-chevron-left')[0]
          .focus()
      }
    }
  }, [indexlightbox])

  const playVideo = {
    autoPlay: true,
    loop: true,
  }
  const renderImage = (media, key) => (
    <div
      role='button'
      aria-label='Aperçu en diaporama'
      className='product__content__item__image'
      tabIndex={lightbox === 'lightbox' ? -1 : 0}
      onKeyDown={(e) => (verificationEvent(e) ? openLightBox(key) : '')}
      onClick={() => openLightBox(key)}>
      {lightbox === 'lightbox' ? (
        <span
          lastbox='true'
          role='button'
          tabIndex={52}
          onClick={() => closeLightBox()}
          onKeyDown={(e) => (verificationEvent(e) ? closeLightBox() : '')}
          type='button'
          className='fas fa-times'
        />
      ) : (
        ''
      )}
      {lightbox === 'lightbox' ? (
        <span
          firstbox='true'
          role='button'
          tabIndex={50}
          onClick={() => changeIndexLightBox(-1)}
          onKeyDown={(e) =>
            verificationEvent(e) ? changeIndexLightBox(-1) : ''
          }
          type='button'
          className='fas fa-chevron-left'
        />
      ) : (
        ''
      )}
      {media.image ? (
        <img alt={media.alt} src={`../img/${photographer.id}/${media.image}`} />
      ) : (
        <video
          alt={media.alt}
          muted
          {...(lightbox === 'lightbox' ? playVideo : '')}>
          <source
            src={`../img/${photographer.id}/${media.video}`}
            type='video/mp4'
          />
        </video>
      )}
      {lightbox === 'lightbox' ? (
        <span
          role='button'
          tabIndex={51}
          onClick={() => changeIndexLightBox(1)}
          onKeyDown={(e) =>
            verificationEvent(e) ? changeIndexLightBox(1) : ''
          }
          type='button'
          className='fas fa-chevron-right'
        />
      ) : (
        ''
      )}
    </div>
  )

  const renderItem = () => {
    applyFilter()
    return medias.map((media, i) => (
      <div
        tabIndex={-1}
        key={useUID(media, i)}
        className='product__content__item'>
        {renderImage(media, i)}
        <div className='product__content__item__description'>
          <div className='product__content__item__description__title'>
            <h2>{media.title}</h2>
          </div>
          <button
            type='button'
            className={
              media.liked
                ? 'product__content__item__description__likes liked'
                : 'product__content__item__description__likes'
            }
            tabIndex={0}
            role='button'
            onClick={(e) => toggleArrayItem(e, i)}>
            <p className='nbLike'>{media.likes}</p>
            <i className='fas fa-heart icon' />
          </button>
        </div>
      </div>
    ))
  }

  return (
    <section className={`product ${lightbox}`}>
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
