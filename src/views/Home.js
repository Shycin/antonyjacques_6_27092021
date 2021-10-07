import React from 'react'
import ListCards from '../components/ListCards'
import ListTags from '../components/ListTags'
import ResetCard from '../components/ResetCards'
import Header from './Header'

const Home = () => (
  <div>
    <Header>
      <ResetCard />
      <ListTags parameter={{ FirstLetter: true }} />
      <h1>Nos photographes</h1>
    </Header>
    <main className='home'>
      <ListCards />
    </main>
  </div>
)
export default Home
