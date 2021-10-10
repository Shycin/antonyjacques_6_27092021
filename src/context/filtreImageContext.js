import PropTypes from 'prop-types'
import React, { useState } from 'react'

export const filtreImageContext = React.createContext()

export const ContextFiltreImageContextProvider = ({ children }) => {
  const [filtreImageSelected, setFiltreImageSelected] = useState('popular')
  return (
    <filtreImageContext.Provider
      value={{
        filtreImageSelected,
        setFiltreImageSelected,
      }}>
      {children}
    </filtreImageContext.Provider>
  )
}

ContextFiltreImageContextProvider.propTypes = {
  children: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.any])
  ).isRequired,
}
