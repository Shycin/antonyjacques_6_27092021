/* eslint-disable spaced-comment */
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { useUID } from 'react-uid'
import { filtreImageContext } from '../context/filtreImageContext'
import '../css/contentprofile.scss'
import jsonData from '../data/site.json'
import '../fontAwesome/css/all.min.css'
import ListBox from './ListBox'

const ContentProfile = ({ photographerID }) => {
  const { filtreImageSelected } = useContext(filtreImageContext)
  const medias = []
  //const [filtre, setFiltre] = useState('popular')
  // Function pour ajouter un ordre croissant et décroissant dans les filtres
  // const [ order, setOrder ] = useState('DESC')
  // const designOrder = { "ASC" : "↑", "DESC" : "↓"}

  /*const filtreExistant = [
    { name: 'Popularité', function: 'popular' },
    { name: 'Date', function: 'date' },
    { name: 'Titre', function: 'title' },
  ]*/

  //const onFiltreChange = (event) => {
  /* Function pour ajouter un ordre croissant et décroissant dans les filtres */ /*
        var inverse_order = "DESC"
        order === "DESC" ? inverse_order = "ASC" : null
        order === "ASC" ? inverse_order = "DESC" : null
        filtre === filtre_existant[event.target.value].function ? setOrder(inverse_order) : null
        */
  //setFiltre(filtreExistant[event.target.value].function)
  //}

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

  const renderImage = (media) => (
    <div className='product__content__item__image'>
      {media.image ? (
        <img alt={media.alt} src={`../img/${photographerID}/${media.image}`} />
      ) : (
        <video muted>
          <source
            src={`../img/${photographerID}/${media.video}`}
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
          <div className='product__content__item__description__likes'>
            <p>{media.likes}</p>{' '}
            <i aria-label='likes' className='fas fa-heart icon' />
          </div>
        </div>
      </div>
    ))
  }

  return (
    <section className='product'>
      <div className='product__filter'>
        <p>Trier par</p>
        {/* <select onChange={onFiltreChange}> 
          {Array.from(filtreExistant).map((filtreSelected, i) => (
            <option key={useUID(filtre, i)} value={i}>
              {filtreSelected.name}{' '}
              {// Partie pour ajouter filtre avec un ordre croissant et décroissant
              // filtre_existant.map(function(e) { return e.function }).indexOf(filtre) === i ? designOrder[order] : null 
              }
            </option>
          ))}
        </select>*/}
        <ListBox />
      </div>
      <div className='product__content'>{renderItem(filtreImageSelected)}</div>
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
