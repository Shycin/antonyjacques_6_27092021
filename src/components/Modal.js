import PropTypes from 'prop-types'
import React from 'react'
import '../css/modal.scss'

const Modal = ({ eventModal }) => {
  const { open, setOpen } = eventModal
  console.log(eventModal)
  // const [, /* hideList */ setHideList] = useState(eventModal)

  // const openModal = () => {
  //   setHideList(false)
  // }

  const validate = (e) => {
    console.log(e)
    e.preventDefault()
  }

  return (
    <div className={`bground ${open ? 'hidden' : ''}`}>
      <div className='content'>
        <label htmlFor='closeTag' className='close'>
          <input
            id='closeTag'
            type='button'
            className='hidden'
            onClick={setOpen(true)}
            onKeyDown={setOpen(true)}
          />
        </label>
        <div className='modal-body'>
          <form
            name='reserve'
            action='index.html'
            method='get'
            onSubmit={validate}>
            <div className='formData'>
              <label htmlFor='first'>
                Prénom
                <input
                  className='text-control'
                  type='text'
                  id='first'
                  name='first'
                />
              </label>
            </div>
            <div className='formData'>
              <label htmlFor='last'>
                Nom{' '}
                <input
                  className='text-control'
                  type='text'
                  id='last'
                  name='last'
                />
              </label>
            </div>
            <div className='formData'>
              <label htmlFor='email'>
                E-mail{' '}
                <input className='text-control' id='email' name='email' />
              </label>
            </div>
            <div className='formData'>
              <label htmlFor='message'>
                Votre message
                <textarea
                  className='text-control'
                  type='text'
                  id='message'
                  name='message'
                />
              </label>
            </div>
            <input
              className='button btn-submit'
              type='submit'
              value="C'est parti"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Modal

Modal.propTypes = {
  eventModal: PropTypes.bool.isRequired,
}
