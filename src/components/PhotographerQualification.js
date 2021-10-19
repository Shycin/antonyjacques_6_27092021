import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import jsonData from '../data/site.json'

const PhotographerQualification = ({ photographerID = 0 }) => {
  const [medias, setMedias] = useState([])

  // function to retrieve all photographer if no photographers parameter
  const compileMediaPhotographer = () => {
    setMedias([])
    jsonData.media.map((media) => {
      if (media.photographerId === photographerID) {
        setMedias((medias_) => [...medias_, media])
      }
      return true
    })
  }

  const additionLikes = (items) => {
    let ret = 0
    items.forEach((element) => {
      console.log(element.likes)
      ret += element.likes
    })

    return ret
  }

  useEffect(() => {
    compileMediaPhotographer()
  }, [])

  return <div>{additionLikes(medias)}</div>
}
export default PhotographerQualification

PhotographerQualification.propTypes = {
  photographerID: PropTypes.number.isRequired,
}
