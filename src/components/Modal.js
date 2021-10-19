/* eslint-disable jsx-a11y/tabindex-no-positive */
import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import { openModalContext } from '../context/openModal'
import '../css/modal.scss'

const Modal = ({ photographer }) => {
  const { openModal, setOpenModal } = useContext(openModalContext)

  function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`))
  }

  function addClass(ele, cls) {
    const element = ele
    if (!hasClass(element, cls)) element.className += ` ${cls}`
  }

  function removeClass(ele, cls) {
    const element = ele
    if (hasClass(element, cls)) {
      const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`)
      element.className = ele.className.replace(reg, ' ')
    }
  }

  function checkTabPress(e) {
    // pick passed event or global event object if passed one is empty
    let activeElement
    if (e.keyCode === 9) {
      // Here read the active selected link.
      activeElement = document.activeElement
      // If HTML element is an anchor <a>
      if (
        !(
          activeElement.hasAttribute('tabIndex') &&
          parseInt(activeElement.attributes.tabIndex.nodeValue, 10) >= 50 &&
          parseInt(activeElement.attributes.tabIndex.nodeValue, 10) < 60
        ) ||
        activeElement.hasAttribute('lastmodal')
      ) {
        document.getElementById('first').focus()
        e.stopPropagation()
        e.preventDefault()
      } else if (activeElement.hasAttribute('firstmodal') && e.shiftKey) {
        document.querySelectorAll('.bground *[lastmodal]')[0].focus()
        e.stopPropagation()
        e.preventDefault()
      }
    }
  }

  const verificationEvent = (e) =>
    e.keyCode === 32 ||
    e.key === ' ' ||
    e.code === 'Space' ||
    e.keyCode === 13 ||
    e.key === 'Enter' ||
    e.code === 'Enter'

  const validate = (e) => {
    e.preventDefault()
    console.log('photographe formulaire')
    console.log('Prénom : ', e.target[0].value)
    console.log('Nom : ', e.target[1].value)
    console.log('E-mail : ', e.target[2].value)
    console.log('Message : ', e.target[3].value)

    return false
  }

  useEffect(() => {
    if (openModal) {
      addClass(document.getElementsByTagName('body')[0], 'notScroll')
      document.getElementById('firstname').focus()
      document.querySelector('body').addEventListener('keydown', checkTabPress)
    } else {
      removeClass(document.getElementsByTagName('body')[0], 'notScroll')
    }
  }, [openModal])

  return (
    <div tabIndex='-1' className={`bground ${!openModal ? 'hidden' : ''}`}>
      <div role='dialog' className='content' aria-labelledby='contact-me'>
        <button
          lastmodal='true'
          tabIndex='55'
          className='close'
          type='button'
          aria-label='Close Contact form'
          onClick={() => {
            document.getElementById('contactMe').focus()
            setOpenModal(false)
          }}
          onKeyDown={(e) =>
            verificationEvent(e)
              ? () => {
                  document.getElementById('contactMe').focus()
                  setOpenModal(false)
                }
              : ''
          }
        />
        <div className='modal-body'>
          <h2 id='contact-me'>Contactez-moi {photographer.name}</h2>
          <form
            name='reserve'
            action='index.html'
            method='get'
            onSubmit={validate}>
            <div className='formData'>
              <label htmlFor='first' id='firstname'>
                Prénom
                <input
                  firstmodal='true'
                  tabIndex='50'
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
                  tabIndex='51'
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
                  tabIndex='52'
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
                  tabIndex='53'
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
              tabIndex='54'
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
