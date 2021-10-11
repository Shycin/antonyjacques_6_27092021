import React, { useContext, useEffect, useState } from 'react'
import { uid } from 'react-uid'
import { filtreImageContext } from '../context/filtreImageContext'

const ListBox = () => {
  const { filtreImageSelected, setFiltreImageSelected } =
    useContext(filtreImageContext)
  const onSelect = (selecteur) => {
    setFiltreImageSelected(selecteur)
  }
  const filtreExistant = [
    { name: 'Popularité', function: 'popular' },
    { name: 'Date', function: 'date' },
    { name: 'Titre', function: 'title' },
  ]

  const [hideList, setHideList] = useState(true)
  const onHideList = () => {
    if (hideList) setHideList(false)
    else setHideList(true)
  }
  const isHideList = (hidden) => (hidden ? 'hidden' : '')

  function mapFiltre() {
    const idx = filtreExistant.findIndex(
      (a) => a.function === filtreImageSelected
    )
    const none = filtreExistant.splice(idx, 1)
    filtreExistant.sort((a, b) => a.function.localeCompare(b.function))
    filtreExistant.splice(0, 0, none[0])

    return filtreExistant.map((filtre, i) => (
      // si l'élément dans les filtres est le même que celui actuellement séléctionner le met au dessus de la pile
      <button
        key={uid(filtre, i)}
        type='button'
        role='link'
        tabIndex={i}
        onClick={() => onSelect(filtre.function)}
        onKeyDown={() => onSelect(filtre.function)}>
        {filtre.name}
      </button>
    ))
  }
  const [renderFiltre, setRenderFiltre] = useState(mapFiltre())

  useEffect(() => {
    const test = mapFiltre()
    console.log(test)
    setRenderFiltre(test)
  }, [filtreImageSelected])

  return (
    <div className='listbox'>
      <button
        type='button'
        className='listbox__selecteur'
        onClick={() => onHideList()}
        onKeyDown={() => onHideList()}>
        {
          filtreExistant.filter((filtre) =>
            filtre.function === filtreImageSelected ? filtre.name : ''
          )[0].name
        }
      </button>
      <div className={`listbox__list ${isHideList(hideList)}`}>
        {renderFiltre}
      </div>
    </div>
  )
}
export default ListBox
