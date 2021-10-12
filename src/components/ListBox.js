import React, { useContext, useState } from 'react'
import { uid } from 'react-uid'
import { filtreImageContext } from '../context/filtreImageContext'
import '../css/listbox.scss'

const ListBox = () => {
  const { filtreImageSelected, setFiltreImageSelected } =
    useContext(filtreImageContext)

  const filtreExistant = [
    { name: 'Popularité', function: 'popular' },
    { name: 'Date', function: 'date' },
    { name: 'Titre', function: 'title' },
  ]

  const [hideList, setHideList] = useState(true)
  const isHideList = (hidden) => (hidden ? 'not_expended' : '')

  // si l'élément dans les filtres est le même que celui actuellement séléctionner le met au dessus de la pile
  const mapFiltre = (currentFiltre) => {
    const idx = filtreExistant.findIndex((a) => a.function === currentFiltre)
    const none = filtreExistant.splice(idx, 1)
    filtreExistant.sort((a, b) => a.function.localeCompare(b.function))
    filtreExistant.splice(0, 0, none[0])

    return filtreExistant.map((filtre, i) => (
      <div
        link_type={filtre.function}
        key={uid(filtre, i)}
        type='button'
        role='option'
        tabIndex={hideList && i !== 0 ? '-1' : '0'}
        id={`listbox-${i}`}
        aria-selected={i === 0 ? 'true' : 'false'}
        className={`listbox__item ${i === 0 ? 'selected' : ''}`}>
        {filtre.name}
        {i === 0 ? (
          <div>
            <i className='icon fas fa-chevron-up up' />
            <i className='icon fas fa-chevron-down down' />
          </div>
        ) : (
          ''
        )}
      </div>
    ))
  }

  const listItemEvent = (e) => {
    if (
      e.type === 'click' ||
      e.keyCode === 32 ||
      e.key === ' ' ||
      e.code === 'Space' ||
      e.keyCode === 13 ||
      e.key === 'Enter' ||
      e.code === 'Enter'
    ) {
      e.preventDefault()

      if (hideList) setHideList(false)
      else setHideList(true)

      if (
        e.target.attributes.link_type &&
        filtreExistant.findIndex(
          (a) => a.function === e.target.attributes.link_type.nodeValue
        ) >= 0
      )
        setFiltreImageSelected(e.target.attributes.link_type.nodeValue)
    }
  }

  return (
    <div className='filter_listbox'>
      <div
        role='listbox'
        tabIndex='0'
        onClick={listItemEvent}
        onKeyDown={listItemEvent}
        onKeyPress={listItemEvent}
        aria-activedescendant='listbox-1'
        className={`listbox ${isHideList(hideList)}`}>
        {mapFiltre(filtreImageSelected)}
      </div>
    </div>
  )
}

export default ListBox
