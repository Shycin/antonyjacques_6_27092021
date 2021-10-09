import PropTypes from 'prop-types'
import React, { useState } from 'react'

export const selectContext = React.createContext()

export const ContextProvider = ({ children }) => {
  const [selected, setSelected] = useState('default')
  return (
    <selectContext.Provider
      value={{
        selected,
        setSelected,
      }}>
      {children}
    </selectContext.Provider>
  )
}

ContextProvider.propTypes = {
  children: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.any])
  ).isRequired,
}
