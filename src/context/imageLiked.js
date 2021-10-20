import PropTypes from 'prop-types'
import React, { useState } from 'react'

export const imageLikedContext = React.createContext()

export const ContextImageLikedContextProvider = ({ children }) => {
  const [totalLikes, setTotalLikes] = useState(0)
  return (
    <imageLikedContext.Provider
      value={{
        totalLikes,
        setTotalLikes,
      }}>
      {children}
    </imageLikedContext.Provider>
  )
}

ContextImageLikedContextProvider.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.any])
  ).isRequired,
}
