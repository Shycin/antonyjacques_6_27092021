import React from 'react'
import Header from './Header'
import ListTags from '../components/ListTags'
import ListCards from '../components/ListCards'
import ResetCard from '../components/ResetCards'

const Home = () => {
    return (
        <div>
            <Header>
                <ResetCard />
                <ListTags parameter={{'FirstLetter': true}} />
                <h1>Nos photographes</h1>
            </Header>
            <main className="home">
                <ListCards />
            </main>
        </div>
    )
}
export default Home