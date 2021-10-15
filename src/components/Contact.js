import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { openModalContext } from '../context/openModal'
import '../css/contact.scss'
import Modal from './Modal'

const Contact = ({ photographer }) => {
  const { setOpenModal } = useContext(openModalContext)

  const verificationEvent = (e) =>
    e.keyCode === 32 ||
    e.key === ' ' ||
    e.code === 'Space' ||
    e.keyCode === 13 ||
    e.key === 'Enter' ||
    e.code === 'Enter'

  return (
    <>
      <button
        id='contactMe'
        className='btn-contact'
        type='button'
        onClick={() => setOpenModal(true)}
        onKeyDown={(e) => (verificationEvent(e) ? setOpenModal(true) : '')}
        tabIndex={0}>
        Contactez-moi
      </button>
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
