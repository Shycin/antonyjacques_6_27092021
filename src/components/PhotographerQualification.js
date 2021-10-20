import PropTypes from 'prop-types'
import { useContext } from 'react'
import { imageLikedContext } from '../context/imageLiked'
import '../css/qualificationphotographer.scss'
import jsonData from '../data/site.json'
import '../fontAwesome/css/all.min.css'

const PhotographerQualification = ({ photographerID }) => {
  const { totalLikes } = useContext(imageLikedContext)
  let photographer = []

  // function to retrieve all product
  const initializeAllProduct = () => {
    jsonData.photographers.map((author) => {
      if (author.id === parseInt(photographerID, 10)) {
        photographer = author
      }
      return true
    })
  }
  initializeAllProduct()

  return (
    <div className='QualificationPhotographer'>
      <div className='QualificationPhotographer__likes'>
        {totalLikes} <span className='fas fa-heart icon' />
      </div>
      <div className='QualificationPhotographer__price'>
        {photographer.price} € / jour
      </div>
    </div>
  )
}
export default PhotographerQualification

PhotographerQualification.propTypes = {
  photographerID: PropTypes.number.isRequired,
}
