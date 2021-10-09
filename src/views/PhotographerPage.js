import React from 'react'
import { useParams } from 'react-router-dom'
import ContentProfile from '../components/ContentProfile'
import ListCards from '../components/ListCards'
import Header from './Header'

const PhotographerPage = () => {
  const { photographerID } = useParams()

  return (
    <div>
      <Header />
      <main id='photographer-page'>
        <ListCards photographerID={parseInt(photographerID, 10)} />
        <ContentProfile photographerID={parseInt(photographerID, 10)} />
      </main>
    </div>
  )
}
export default PhotographerPage
