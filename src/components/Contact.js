import React from 'react'
import PropTypes from "prop-types"

const Contact = ({photographerID}) => {
    return (
        <div>
            contactez moi : { photographerID }
        </div>
    )
}
export default Contact


Contact.propTypes = {
    photographerID: PropTypes.number.isRequired,
};