/* eslint-disable camelcase */
import React, { useState } from 'react'
import { uid } from 'react-uid'

const ListBox = () => {
  const [itemSelected /* , setItemSelected */] = useState('popular')
  const filtre_existant = [
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
        {filtre_existant.map((filtre, i) => {
          let key_i = i
          if (filtre.name === itemSelected) {
            key_i = 0
          } else {
            key_i += 1
          } // si l'élément dans les filtres est le même que celui actuellement séléctionner le met au dessus de la pile
          return <div key={uid(filtre, key_i)}>{filtre.name}</div>
        })}
      </div>
    </div>
  )
}
export default ListBox
