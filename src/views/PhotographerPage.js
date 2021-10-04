import React from 'react'
import { useParams } from "react-router-dom";

import Header from './Header'
import ListCards from '../components/ListCards'
import Contact from '../components/Contact'

const PhotographerPage = () => {
    const { photographerID } = useParams();

    return (
        <div>
            <Header />
            <main id="photographer-page">
                <ListCards target={[photographerID]} contact_target={[<Contact key="0" photographerID={photographerID}/>]}>
                    
                </ListCards>
            </main>
        </div>
    )
}
export default PhotographerPage