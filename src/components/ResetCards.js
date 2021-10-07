import React, { useContext, useState } from 'react'
import { ContextComponent } from '../Provider'

const ResetCard = () => {
        const { selected, setSelected } = useContext(ContextComponent)
    const [ show, setShow ] = useState(false)

    var last_position = 0;

    const show_resetCards = (position_scroll) => {
        if(position_scroll >= 100 || selected != 'default')
        {
            setShow(true)
        }
        else
        {
            setShow(false)
        }
    }

    window.addEventListener('scroll', function() {
        last_position = window.scrollY;
        show_resetCards(last_position);
    });



    return (
        <div className={"reset_Cards " + ( show || selected != 'default'  ? '' : 'hidden' )}>
            <button onClick={ () => {setSelected('default'); setShow(false);  window.scrollTo(0,0); } }>Passer au contenu</button>
        </div>
    )
}
export default ResetCard