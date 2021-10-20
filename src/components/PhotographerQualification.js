import React, { useContext } from 'react'
import { imageLikedContext } from '../context/imageLiked'

const PhotographerQualification = () => {
  const { totalLikes } = useContext(imageLikedContext)

  return <div>{totalLikes}</div>
}
export default PhotographerQualification
