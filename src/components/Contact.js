import PropTypes from 'prop-types'
import React from 'react'
import '../css/contact.scss'

const Contact = ({ photographerID }) => {
  console.log(photographerID)

  const modal = () => {}
  const handleKeyDown = () => {}

  return (
    <div
      className='btn-contact'
      onClick={() => modal()}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}>
      Contactez-moi
    </div>
  )
}
export default Contact

Contact.propTypes = {
  photographerID: PropTypes.number.isRequired,
}
