import PropTypes from 'prop-types'
import React, { useState } from 'react'

export const openModalContext = React.createContext()

export const ContextOpenModalContextProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <openModalContext.Provider
      value={{
        openModal,
        setOpenModal,
      }}>
      {children}
    </openModalContext.Provider>
  )
}

ContextOpenModalContextProvider.propTypes = {
  children: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.any])
  ).isRequired,
}
