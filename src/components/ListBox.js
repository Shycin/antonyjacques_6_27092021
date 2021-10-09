import React, { useState } from 'react'
import { uid } from 'react-uid'

const ListBox = () => {
  const [itemSelected /* , setItemSelected */] = useState('popular')
  const filtreExistant = [
    { name: 'Popularité', function: 'popular' },
    { name: 'Date', function: 'date' },
    { name: 'Titre', function: 'title' },
  ]
  // const toggle_visibility = 'hidden'

  return (
    <div className='listbox'>
      <button type='button' className='listbox__selecteur'>
        {itemSelected}
      </button>
      <div className='listbox__list'>
        {filtreExistant.map((filtre, i) => {
          let keyI = i
          if (filtre.name === itemSelected) {
            keyI = 0
          } else {
            keyI += 1
          } // si l'élément dans les filtres est le même que celui actuellement séléctionner le met au dessus de la pile
          return <div key={uid(filtre, keyI)}>{filtre.name}</div>
        })}
      </div>
    </div>
  )
}
export default ListBox
