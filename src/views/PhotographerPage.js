import React from 'react'
import { useParams } from 'react-router-dom'
import ContentProfile from '../components/ContentProfile'
import ListCards from '../components/ListCards'
import PhotographerQualification from '../components/PhotographerQualification'
import { ContextFiltreImageContextProvider } from '../context/filtreImageContext'
import { ContextImageLikedContextProvider } from '../context/imageLiked'
import jsonData from '../data/site.json'
import Header from './Header'

const PhotographerPage = () => {
  const { photographerID } = useParams()

  const photographer = []

  // function to retrieve all product
  const initializeAllProduct = () => {
    jsonData.photographers.map((author) => {
      if (author.id === parseInt(photographerID, 10)) {
        photographer.push(author)
      }
      return true
    })
  }
  initializeAllProduct()

  return (
    <div>
      <Header />
      <main id='photographer-page'>
        <ListCards photographerID={parseInt(photographerID, 10)} />
        <ContextImageLikedContextProvider>
          <ContextFiltreImageContextProvider>
            <ContentProfile photographer={photographer[0]} />
          </ContextFiltreImageContextProvider>
          <PhotographerQualification
            photographerID={parseInt(photographerID, 10)}
          />
        </ContextImageLikedContextProvider>
      </main>
    </div>
  )
}
export default PhotographerPage
