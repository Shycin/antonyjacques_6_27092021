/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-redundant-roles */
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
  const isHideList = (hidden) => (hidden ? 'hidden' : '')

  // si l'élément dans les filtres est le même que celui actuellement séléctionner le met au dessus de la pile
  /* const mapFiltre = (currentFiltre) => {
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
        aria-labelledby={`item-${filtre.function}`}
        className={`listbox__item ${i === 0 ? 'selected' : ''}`}>
        <p id={`item-${filtre.function}`}>{filtre.name}</p>
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
  } */

  const verificationEvent = (e) =>
    e.type === 'click' ||
    e.keyCode === 32 ||
    e.key === ' ' ||
    e.code === 'Space' ||
    e.keyCode === 13 ||
    e.key === 'Enter' ||
    e.code === 'Enter'

  const showItem = (e) => {
    if (verificationEvent(e)) {
      e.preventDefault()

      if (hideList) setHideList(false)
      else setHideList(true)

      if (
        e.target.attributes.link_type &&
        filtreExistant.findIndex(
          (a) => a.function === e.target.attributes.link_type.nodeValue
        ) >= 0
      ) {
        setFiltreImageSelected(e.target.attributes.link_type.nodeValue)
        const listbox = document.getElementsByClassName('listbox__list ')[0]
        listbox.focus()
      }
    }
  }

  const selectItem = (e) => {
    if (verificationEvent(e)) {
      e.preventDefault()
      console.log(e)
      /* if (
        selection &&
        filtreExistant.findIndex((a) => a.function === selection) >= 0
      ) {
        setFiltreImageSelected(selection)
        const listbox = document.getElementsByClassName('listbox__btn')[0]
        listbox.focus()
      } */
    }
  }

  // si l'élément dans les filtres est le même que celui actuellement séléctionner le met au dessus de la pile
  const mapFiltre = () => {
    const idx = filtreExistant.findIndex(
      (a) => a.function === filtreImageSelected
    )
    const none = filtreExistant.splice(idx, 1)
    filtreExistant.sort((a, b) => a.function.localeCompare(b.function))
    filtreExistant.splice(0, 0, none[0])

    return (
      <ul
        id='order_filtre'
        aria-activedescendant='order-0'
        tabIndex='-1'
        role='listbox'
        aria-labelledby='order_label'
        className={`listbox__list ${isHideList(hideList)}`}>
        {filtreExistant.map((filtre, i) => (
          <li
            id={`order-${i}`}
            key={uid(filtre, i)}
            role='option'
            className='listbox__elt selected'
            tabIndex='0'
            onClick={selectItem}
            onKeyDown={selectItem}
            onKeyPress={selectItem}
            aria-selected={
              filtre.function === filtreImageSelected ? 'true' : 'false'
            }>
            {filtre.name}
            {i === 0 ? <span className='fas fa-chevron-down' /> : ''}
          </li>
        ))}
      </ul>
    )
  }

  /* return (
    <div className='filter_listbox'>
      <div
        role='listbox'
        tabIndex='-1'
        onClick={listItemEvent}
        onKeyDown={listItemEvent}
        onKeyPress={listItemEvent}
        aria-activedescendant='listbox-1'
        aria-expanded='true'
        className={`listbox ${isHideList(hideList)}`}>
        {mapFiltre(filtreImageSelected)}
      </div>
    </div>
  ) */

  return (
    <div className='listbox'>
      <button
        onClick={showItem}
        onKeyDown={showItem}
        onKeyPress={showItem}
        role='button'
        aria-haspopup='listbox'
        aria-labelledby='order_label'
        aria-expanded='false'
        id='order_filtre'
        className='listbox__btn btn select'>
        <span className='listbox__btn__text'>
          {
            filtreExistant[
              filtreExistant.findIndex(
                (a) => a.function === filtreImageSelected
              )
            ].name
          }
        </span>
        <span className='fas fa-chevron-up' />
      </button>
      {mapFiltre()}
    </div>
  )
}

export default ListBox
