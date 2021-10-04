import React from 'react'
import { useParams } from "react-router-dom";

import Header from './Header'
import ListCards from '../components/ListCards';
import ContentProfile from '../components/ContentProfile';

const PhotographerPage = () => {
    const { photographerID } = useParams();

    return (
        <div>
            <Header />
            <main id="photographer-page">
                <ListCards photographerID={photographerID}/>
                <ContentProfile photographerID={photographerID}/>
            </main>
        </div>
    )
}
export default PhotographerPage