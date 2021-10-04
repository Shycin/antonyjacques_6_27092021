import React from 'react'
import PropTypes from "prop-types"

import '../css/contact.scss';

const Contact = ({photographerID}) => {
    console.log(photographerID)


    const modal = () => {

    }

    return (
        <div className="btn-contact" onClick={ () => modal()}>
            Contactez-moi
        </div>
    )
}
export default Contact


Contact.propTypes = {
    photographerID: PropTypes.number.isRequired,
};