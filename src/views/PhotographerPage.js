import React from 'react'
import { useParams } from "react-router-dom";

import Header from './Header'
import ListCards from '../components/ListCards'

const PhotographerPage = () => {
    const { photographerID } = useParams();

    return (
        <div>
            <Header />
            <main id="photographer-page">
                <ListCards target={[photographerID]}></ListCards>
            </main>
        </div>
    )
}
export default PhotographerPage