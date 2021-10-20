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
  const [lightbox, setLightbox] = useState('')
  const [indexlightbox, setIndexlightbox] = useState(null)
  const [medias, setMedias] = useState(
    jsonData.media
      .map((media) => (media.photographerId === photographer.id ? media : null))
      .filter((x) => x !== null)
  )

  function checkTabPress(e) {
    console.log(e)
    // pick passed event or global event object if passed one is empty
    let activeElement
    if (e.keyCode === 9) {
      // Here read the active selected link.
      activeElement = document.activeElement
      // If HTML element is an anchor <a>
      if (
        !(
          activeElement.hasAttribute('tabIndex') &&
          parseInt(activeElement.attributes.tabIndex.nodeValue, 10) >= 50 &&
          parseInt(activeElement.attributes.tabIndex.nodeValue, 10) < 60
        ) ||
        activeElement.hasAttribute('lastbox')
      ) {
        console.log(
          document.querySelectorAll(
            '.product__content__item--show .fa-chevron-right'
          )
        )
        document
          .querySelectorAll(
            '.product__content__item--show .fa-chevron-right'
          )[0]
          .focus()
        e.stopPropagation()
        e.preventDefault()
      } else if (activeElement.hasAttribute('firstbox') && e.shiftKey) {
        console.log(
          document.querySelectorAll(
            '.product__content__item--show *[lastbox]'
          )[0]
        )
        document
          .querySelectorAll('.product__content__item--show *[lastbox]')[0]
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

  const openLightBox = (key) => {
    if (lightbox === '') {
      setIndexlightbox(key)
      setLightbox('lightbox')

      document.querySelector('body').addEventListener('keydown', checkTabPress)
    }
  }

  const changeIndexLightBox = (number) => {
    console.log(number)
    document
      .getElementsByClassName('product__content__item--show')[0]
      .classList.toggle('product__content__item')

    document
      .getElementsByClassName('product__content__item--show')[0]
      .classList.toggle('product__content__item--show')

    setIndexlightbox(indexlightbox + number)
  }

  useEffect(() => {
    console.log(indexlightbox)
    if (indexlightbox !== null) {
      document
        .getElementsByClassName('product__content__item')
        [indexlightbox].classList.toggle('product__content__item--show')
      document
        .getElementsByClassName('product__content__item')
        [indexlightbox].classList.toggle('product__content__item')

      document
        .querySelector(
          '.product__content__item--show .product__content__item__image .fa-chevron-right'
        )
        .focus()
    }
  }, [indexlightbox])

  const renderImage = (media, key) => (
    <div
      role='button'
      className='product__content__item__image'
      tabIndex={lightbox === '' ? 0 : -1}
      onKeyDown={() => openLightBox(key)}
      onClick={() => openLightBox(key)}>
      {lightbox !== '' ? (
        <span
          firstbox='true'
          role='button'
          tabIndex={50}
          onClick={() => changeIndexLightBox(-1)}
          onKeyDown={(e) =>
            verificationEvent(e)
              ? () => {
                  changeIndexLightBox(-1)
                }
              : console.log('bug')
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
        <video muted>
          <source
            src={`../img/${photographer.id}/${media.video}`}
            type='video/mp4'
          />
        </video>
      )}
      {lightbox !== '' ? (
        <span
          lasttbox='true'
          role='button'
          tabIndex={51}
          onClick={() => changeIndexLightBox(1)}
          onKeyDown={(e) =>
            verificationEvent(e)
              ? () => {
                  changeIndexLightBox(1)
                }
              : ''
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
      <div key={useUID(media, i)} className='product__content__item'>
        {renderImage(media, i)}
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
            <span aria-label='likes' className='fas fa-heart icon' />
          </div>
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
