import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { openModalContext } from '../context/openModal'
import '../css/contact.scss'
import Modal from './Modal'

const Contact = ({ photographer }) => {
  const { setOpenModal } = useContext(openModalContext)

  return (
    <>
      <div
        className='btn-contact'
        onClick={() => setOpenModal(true)}
        onKeyDown={() => setOpenModal(true)}
        role='button'
        tabIndex={0}>
        Contactez-moi
      </div>
      <Modal photographer={photographer} />
    </>
  )
}
export default Contact

Contact.propTypes = {
  photographer: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number])
  ).isRequired,
}
