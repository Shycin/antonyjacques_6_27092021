import PropTypes from 'prop-types'
import React, { useState } from 'react'
import '../css/contact.scss'
import Modal from './Modal'

const Contact = ({ photographerID }) => {
  console.log(photographerID)
  const [, /* open */ setOpen] = useState(false)

  return (
    <>
      <div
        className='btn-contact'
        onClick={() => {
          setOpen(true)
          setOpen(false)
        }}
        onKeyDown={() => {
          setOpen(true)
          setOpen(false)
        }}
        role='button'
        tabIndex={0}>
        Contactez-moi
      </div>
      <Modal eventModal />
    </>
  )
}
export default Contact

Contact.propTypes = {
  photographerID: PropTypes.number.isRequired,
}
