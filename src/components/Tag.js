import React , { useContext } from 'react'
import PropTypes from "prop-types";
import { TagSelected } from '../Provider'


const Tag = ({tag, capitalize}) => {
    const { selected, setSelected } = useContext(TagSelected)
    
    const capitalizeFirstLetter = (string) => {
        if(capitalize)
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return string  
    }

    const onClick = () => {
        setSelected(tag)
    }

    return (
        <li className="navigation__list__item">
            <button 
                tag={'#'+ capitalizeFirstLetter(tag)} 
                onClick={() => onClick() }
                className={"btn-categories " + (tag == selected ? 'selected' : 'not_selected')}
            >
                {'#'+ capitalizeFirstLetter(tag)}
            </button>
        </li>  
    )
}
export default Tag

Tag.propTypes = {
    tag: PropTypes.string.isRequired,
    selected: PropTypes.string,
    capitalize: PropTypes.bool
};