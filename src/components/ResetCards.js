import React, { useContext, useState } from 'react'
import { selectContext } from '../Provider'

const ResetCard = () => {
  const { selected, setSelected } = useContext(selectContext)
  const [show, setShow] = useState(false)

  let lastPosition = 0

  const showResetCards = (positionScroll) => {
    if (positionScroll >= 100 || selected !== 'default') {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  window.addEventListener('scroll', () => {
    lastPosition = window.scrollY
    showResetCards(lastPosition)
  })

  return (
    <div
      className={`reset_Cards ${
        show || selected !== 'default' ? '' : 'hidden'
      }`}>
      <button
        type='button'
        onClick={() => {
          setSelected('default')
          setShow(false)
          window.scrollTo(0, 0)
        }}>
        Passer au contenu
      </button>
    </div>
  )
}
export default ResetCard
