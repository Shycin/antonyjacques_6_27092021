import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useUID } from 'react-uid'
import '../css/contentprofile.scss'
import jsonData from '../data/site.json'

const ContentProfile = ({ photographerID }) => {
  const medias = []
  const [filtre, setFiltre] = useState('popular')
  // Function pour ajouter un ordre croissant et décroissant dans les filtres
  // const [ order, setOrder ] = useState('DESC')
  // const designOrder = { "ASC" : "↑", "DESC" : "↓"}
  console.log(photographerID)
  const filtreExistant = [
    { name: 'Popularité', function: 'popular' },
    { name: 'Date', function: 'date' },
    { name: 'Titre', function: 'title' },
  ]

  const onFiltreChange = (event) => {
    /* Function pour ajouter un ordre croissant et décroissant dans les filtres */ /*
        var inverse_order = "DESC"
        order === "DESC" ? inverse_order = "ASC" : null
        order === "ASC" ? inverse_order = "DESC" : null
        filtre === filtre_existant[event.target.value].function ? setOrder(inverse_order) : null
        */
    setFiltre(filtreExistant[event.target.value].function)
  }

  // function to retrieve all product
  const initializeAllProduct = () => {
    jsonData.media.map((media) => {
      if (media.photographerId === photographerID) {
        medias.push(media)
      }
      return true
    })
  }
  initializeAllProduct()

  const renderImage = (filterSelect) => {
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

    return arrayRender.map((media, i) => {
      console.log(media.likes, media.date, media.title)
      return (
        <div key={useUID(filtre, i)} className='product__content__item'>
          {media.image ? (
            <img
              alt={media.alt}
              src={`../img/${photographerID}/${media.image}`}
            />
          ) : (
            <video muted poster={`../img/${photographerID}/${media.video}`}>
              <source
                src={`../img/${photographerID}/${media.video}`}
                type='video/mp4'
              />
            </video>
          )}
        </div>
      )
    })
  }

  return (
    <section className='product'>
      <div className='product__filter'>
        <p>Trier par</p>
        <select onChange={onFiltreChange}>
          {Array.from(filtreExistant).map((filtreSelected, i) => (
            <option key={useUID(filtre, i)} value={i}>
              {filtreSelected.name}{' '}
              {/* Partie pour ajouter filtre avec un ordre croissant et décroissant */
              /* filtre_existant.map(function(e) { return e.function }).indexOf(filtre) === i ? designOrder[order] : null */}
            </option>
          ))}
        </select>
      </div>
      <div className='product__content'>{renderImage(filtre)}</div>
    </section>
  )
}
export default ContentProfile

ContentProfile.propTypes = {
  photographerID: PropTypes.number,
}

ContentProfile.defaultProps = {
  photographerID: null,
}
