import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { selectContext } from '../Provider'

const Tag = ({ tag, capitalize }) => {
  const { selected, setSelected } = useContext(selectContext)

  const capitalizeFirstLetter = (string) => {
    if (capitalize) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return string
  }

  const onClick = () => {
    if (tag === selected) {
      setSelected('default')
    } else {
      setSelected(tag)
    }
  }
  const handleKeyDown = () => {}

  return (
    <li className='navigation__list__item'>
      <button
        onKeyDown={handleKeyDown}
        role='link'
        tabIndex={0}
        type='button'
        tag={`#${capitalizeFirstLetter(tag)}`}
        onClick={() => onClick()}
        className={`btn-categories ${
          tag === selected ? 'selected' : 'not_selected'
        }`}>
        {`#${capitalizeFirstLetter(tag)}`}
      </button>
    </li>
  )
}
export default Tag

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  capitalize: PropTypes.bool,
}

Tag.defaultProps = {
  capitalize: false,
}
