import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { openModalContext } from '../context/openModal'
import '../css/modal.scss'

const Modal = ({ photographer }) => {
  const { openModal, setOpenModal } = useContext(openModalContext)

  const validate = (e) => {
    console.log('photographe : ', photographer.id)
    e.preventDefault()
  }

  return (
    <div className={`bground ${!openModal ? 'hidden' : ''}`}>
      <div className='content' aria-labelledby='contact-me'>
        <label htmlFor='closeTag' className='close'>
          <input
            id='closeTag'
            type='button'
            className='hidden'
            aria-label='Close Contact form'
            onClick={() => setOpenModal(false)}
            onKeyDown={() => setOpenModal(false)}
          />
        </label>
        <div className='modal-body'>
          <h2 id='contact-me'>Contactez-moi {photographer.name}</h2>
          <form
            name='reserve'
            action='index.html'
            method='get'
            onSubmit={() => validate}>
            <div className='formData'>
              <label htmlFor='first' id='firstname'>
                Prénom
                <input
                  className='text-control'
                  type='text'
                  id='first'
                  name='first'
                  aria-label='First name'
                  aria-labelledby='firstname'
                />
              </label>
            </div>
            <div className='formData'>
              <label htmlFor='last' id='lastname'>
                Nom
                <input
                  className='text-control'
                  type='text'
                  id='last'
                  name='last'
                  aria-label='Last name'
                  aria-labelledby='lastname'
                />
              </label>
            </div>
            <div className='formData'>
              <label htmlFor='email' id='emailLabel'>
                E-mail
                <input
                  className='text-control'
                  id='email'
                  name='email'
                  aria-label='Email'
                  aria-labelledby='emailLabel'
                />
              </label>
            </div>
            <div className='formData'>
              <label htmlFor='message' id='messageLabel'>
                Votre message
                <textarea
                  className='text-control'
                  type='text'
                  id='message'
                  name='message'
                  aria-label='Your message'
                  aria-labelledby='messageLabel'
                />
              </label>
            </div>
            <input
              className='button btn-submit'
              type='submit'
              value='Envoyer'
              aria-label='send'
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Modal

Modal.propTypes = {
  photographer: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number])
  ).isRequired,
}
