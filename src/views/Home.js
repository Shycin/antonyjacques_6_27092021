import React from 'react'
import Header from './Header'
import ListTags from '../components/ListTags'
import ListCards from '../components/ListCards'
import ResetCards from '../components/ResetCards'

import '../css/reset.scss';

const Home = () => {
    return (
        <div>
            <Header>
                <ResetCards></ResetCards>
                <ListTags parameter={{'FirstLetter': true}} />
                <h1>Nos photographes</h1>
            </Header>
            <main>
                <ListCards></ListCards>
            </main>
        </div>
    )
}
export default Home