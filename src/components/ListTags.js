import PropTypes from 'prop-types'
import React from 'react'
import '../css/tag.scss'
import jsonData from '../data/site.json'
import Tag from './Tag'

const ListTags = ({ tags, parameter }) => {
  // function to retrieve all tags if no tags parameter
  const initializeAllTags = () => {
    if (tags.length === 0 || tags.length == null) {
      jsonData.photographers.map((photographer) =>
        photographer.tags.map((tag) =>
          tags.indexOf(tag) === -1 ? tags.push(tag) : null
        )
      )
    }
  }
  initializeAllTags()

  const renderTag = (tag, i) => (
    <Tag key={i} tag={tag} capitalize={parameter.FirstLetter} />
  )

  return (
    <>
      <nav className='navigation'>
        <ul className='navigation__list'>
          {tags.map((tag, i) => renderTag(tag, i))}
        </ul>
      </nav>
    </>
  )
}
export default ListTags

ListTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  FirstLetter: PropTypes.bool,
  parameter: PropTypes.objectOf(PropTypes.arrayOf),
}

ListTags.defaultProps = {
  tags: [],
  FirstLetter: false,
  parameter: {},
}
