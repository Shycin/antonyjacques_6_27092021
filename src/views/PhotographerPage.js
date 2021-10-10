import React from 'react'
import { useParams } from 'react-router-dom'
import ContentProfile from '../components/ContentProfile'
import ListCards from '../components/ListCards'
import { ContextFiltreImageContextProvider } from '../context/filtreImageContext'
import Header from './Header'

const PhotographerPage = () => {
  const { photographerID } = useParams()

  return (
    <div>
      <Header />
      <main id='photographer-page'>
        <ListCards photographerID={parseInt(photographerID, 10)} />
        <ContextFiltreImageContextProvider>
          <ContentProfile photographerID={parseInt(photographerID, 10)} />
        </ContextFiltreImageContextProvider>
      </main>
    </div>
  )
}
export default PhotographerPage
