import React, { useContext, useState } from 'react'
import { TagSelected } from '../Provider'

const Home = () => {
    const { setSelected } = useContext(TagSelected)
    const [ show, setShow ] = useState(false)

    var last_position = 0;
    var ticking = false;

    const show_resetCards = (position_scroll) => {
        if(position_scroll >= '100')
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

        if (!ticking) {
            window.requestAnimationFrame(function() {
                show_resetCards(last_position);
                ticking = false;
            });
        }

        ticking = true;
    });



    return (
        <div className={"reset_Cards " + ( show ? '' : 'hidden' )}>
            <button onClick={ () => {setSelected('default'); window.scrollTo(0,0); } }>Passer au contenu</button>
        </div>
    )
}
export default Home