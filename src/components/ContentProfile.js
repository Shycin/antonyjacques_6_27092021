import React , { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import json_data from '../data/site.json'

import '../css/contentprofile.scss';

const ContentProfile = ({photographerID}) => {
    const medias = []
    const [ filtre, setFiltre] = useState('popular')
    const [ order, setOrder ] = useState('DESC')
    const designOrder = { "ASC" : "↑", "DESC" : "↓"}

    useEffect(() => {    
        //console.log(medias)
    });

    const filtre_existant = [{"name":"Popularité","function":"popular"},{"name":"Date","function":"date"},{"name":"Titre","function":"title"}]

    const onFiltreChange = (event) => {
        var inverse_order = "DESC"
        order === "DESC" ? inverse_order = "ASC" : null
        order === "ASC" ? inverse_order = "DESC" : null
        filtre === filtre_existant[event.target.value].function ? setOrder(inverse_order) : null

        setFiltre(filtre_existant[event.target.value].function)  
    }

   /* const onFiltreBlur = (event) => {
        console.log("test",event)
    }*/
   
    
    // function to retrieve all product
    const initialize_all_product = () => {
        json_data.media.map(
            media => {
                if(media.photographerId == photographerID)
                {
                    medias.push(media)
                }
            }
        );
    }
    initialize_all_product()


    const render_image = (filter_select) => {

        var array_render = medias;
        var reverse = order == 'ASC' ? 1 : -1;

        switch ( filter_select )
        {
            case 'popular':
                    array_render = array_render.sort((a, b) => {
                        return reverse * ((a.likes > b.likes) - (b.likes > a.likes)) 
                    })
                break;

            case 'date':
                    array_render = array_render.sort((a,b) => {
                        return reverse * ((new Date(a.date) > new Date(b.date)) - (new Date(b.date) > new Date(a.date)));
                    });
                break;

            case 'title':
                    array_render = array_render.sort((a, b) => {
                        return reverse * ((a.title > b.title) - (b.title > a.title)) 
                    });
                break;
        }


        return array_render.map(
            (media,i) => {
                console.log(media.likes,media.date,media.title)
                return <div key={i} className="product__content__item">
                    {(media.image ? 
                    <img src={'../img/' + photographerID + '/' + media.image}></img> : 
                    <video poster={'../img/' + photographerID + '/' + media.video}>
                        <source
                            src={'../img/' + photographerID + '/' + media.video}
                            type="video/mp4" 
                        />
                    </video>
                    )}
                </div>
            }
        )
    }


    return (
        <section className="product">
            <div className="product__filter">
                <p>Trier par</p>
                <select>
                    {
                        Array.from(filtre_existant).map(
                            (filtre_selected,i) => <option key={i} value={i} onClick={onFiltreChange}>{filtre_selected.name} { filtre_existant.map(function(e) { return e.function }).indexOf(filtre) === i ? designOrder[order] : null }</option>
                        )
                    }
                </select>
            </div>
            <div className="product__content">
                {
                   render_image(filtre)
                }
            </div>
        </section>
    )
}
export default ContentProfile

ContentProfile.propTypes = {
    reverse: PropTypes.oneOf(['ASC', 'DESC']),
    photographerID: PropTypes.string,
};