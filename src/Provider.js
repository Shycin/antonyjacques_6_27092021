import React, { useState } from 'react'
import PropTypes from "prop-types";

export const TagSelected = React.createContext()

export const ContextProvider = ({ children }) => {
    const [selected, setSelected] = useState('default')
    return (
        <TagSelected.Provider
            value={{
                selected,
                setSelected,
            }}
        >
            {children}
        </TagSelected.Provider>
    )
}

ContextProvider.propTypes = {
    children: PropTypes.object.isRequired,
};