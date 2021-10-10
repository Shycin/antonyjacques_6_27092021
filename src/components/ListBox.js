import React, { useContext } from 'react'
import { uid } from 'react-uid'
import { filtreImageContext } from '../context/filtreImageContext'

const ListBox = () => {
  const { filtreImageSelected, setFiltreImageSelected } =
    useContext(filtreImageContext)
  const filtreExistant = [
    { name: 'Popularité', function: 'popular' },
    { name: 'Date', function: 'date' },
    { name: 'Titre', function: 'title' },
  ]
  // const toggle_visibility = 'hidden'

  const onSelect = (selecteur) => {
    setFiltreImageSelected(selecteur)
  }

  return (
    <div className='listbox'>
      <button type='button' className='listbox__selecteur'>
        {
          filtreExistant.filter((filtre) =>
            filtre.function === filtreImageSelected ? filtre.name : ''
          )[0].name
        }
      </button>
      <div className='listbox__list'>
        {filtreExistant.map((filtre, i) => {
          let keyI = i
          if (filtre.function === filtreImageSelected) {
            keyI = 0
          } else {
            keyI += 1
          } // si l'élément dans les filtres est le même que celui actuellement séléctionner le met au dessus de la pile
          return (
            <button
              key={uid(filtre, keyI)}
              type='button'
              role='link'
              tabIndex={keyI}
              onClick={() => onSelect(filtre.function)}
              onKeyDown={() => onSelect(filtre.function)}>
              {filtre.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
export default ListBox
