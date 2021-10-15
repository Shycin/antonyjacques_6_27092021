import React from 'react'
import { useParams } from 'react-router-dom'
import ContentProfile from '../components/ContentProfile'
import ListCards from '../components/ListCards'
import { ContextFiltreImageContextProvider } from '../context/filtreImageContext'
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
        <ContextFiltreImageContextProvider>
          <ContentProfile photographer={photographer[0]} />
        </ContextFiltreImageContextProvider>
      </main>
    </div>
  )
}
export default PhotographerPage
