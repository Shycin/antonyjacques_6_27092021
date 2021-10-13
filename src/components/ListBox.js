/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useContext, useEffect, useState } from 'react'
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
      setHideList(false)
    }
  }

  const selectItem = (selection) => (e) => {
    if (verificationEvent(e)) {
      if (
        selection &&
        filtreExistant.findIndex((a) => a.function === selection) > 0
      ) {
        setFiltreImageSelected(selection)
      }

      e.preventDefault()
      const listbox = document.getElementsByClassName('listbox__btn')[0]
      listbox.focus()
      setHideList(true)
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
        id='order_list'
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
            className={`listbox__elt ${
              filtre.function === filtreImageSelected ? 'selected' : ''
            }`}
            tabIndex='0'
            onClick={selectItem(filtre.function)}
            onKeyDown={selectItem(filtre.function)}
            onKeyPress={selectItem(filtre.function)}
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

  useEffect(() => {
    if (document.getElementsByClassName('selected').length) {
      const listbox = document.getElementsByClassName('selected')[0]
      listbox.focus()
    }
  }, [mapFiltre])

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
