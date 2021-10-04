import React, { useState } from 'react'
import PropTypes from "prop-types";

export const ContextComponent = React.createContext()

export const ContextProvider = ({ children }) => {
    const [selected, setSelected] = useState('default')
    return (
        <ContextComponent.Provider
            value={{
                selected,
                setSelected,
            }}
        >
            {children}
        </ContextComponent.Provider>
    )
}

ContextProvider.propTypes = {
    children: PropTypes.object.isRequired,
};