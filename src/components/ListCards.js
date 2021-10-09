import PropTypes from 'prop-types'
import React, { useState } from 'react'
import '../css/card.scss'
import '../css/tag.scss'
import jsonData from '../data/site.json'
import Card from './Card'
import CardProfile from './CardProfile'

const ListCards = ({ photographerID }) => {
  const [photographers] = useState([])
  const [photographersName] = useState([])

  // function to retrieve all photographer if no photographers parameter
  const initializeAllPhotographer = () => {
    jsonData.photographers.map((photographer) => {
      if (photographersName.indexOf(photographer.name) === -1) {
        photographers.push(photographer)
        photographersName.push(photographer.name)
      }
      return true
    })
  }
  initializeAllPhotographer()

  const renderCard = (photographer, i) => {
    if (photographerID === 0) {
      return <Card key={i} photographer={photographer} />
    }
    if (photographerID === photographer.id) {
      return <CardProfile key={i} photographer={photographer} />
    }

    return null
  }
  return (
    <section className='photographers'>
      {photographers.map((photographer, i) => renderCard(photographer, i))}
    </section>
  )
}
export default ListCards

ListCards.propTypes = {
  photographerID: PropTypes.number,
}

ListCards.defaultProps = {
  photographerID: 0,
}
