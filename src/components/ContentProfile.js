import React , { useState } from 'react'
import PropTypes from "prop-types"
import json_data from '../data/site.json'

import '../css/contentprofile.scss';

const ContentProfile = ({photographerID}) => {
    const [medias] = useState([])
    //const [ filtre, setFiltre ] = useState('popular')



    const onFiltreChange = (event) => {
        filtre_existant[event.target.value].function.call()
    }
    const popular = (reverse = 'ASC') => {
        reverse = reverse == 'ASC' ? 1 : -1;
        medias.sort((a, b) => {
            return reverse * ((a.likes > b.likes) - (b.likes > a.likes)) 
        })
    }
    const date = (reverse = 'ASC') => {
        reverse = reverse == 'ASC' ? 1 : -1;
        medias.sort((a,b) => {
            return reverse * ((new Date(a.date) > new Date(b.date)) - (new Date(b.date) > new Date(a.date)));
        })
    }
    const title = (reverse = 'ASC') => {
        reverse = reverse == 'ASC' ? 1 : -1;
        medias.sort((a, b) => {
            return reverse * ((a.title > b.title) - (b.title > a.title)) 
        })
    }
    const filtre_existant = [{"name":"Popularité","function":popular},{"name":"Date","function":date},{"name":"Titre","function":title}]

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

    //init render with order by popular DESC
    popular('DESC')


    return (
        <section className="product">
            <div className="product__filter">
                <p>Trier par</p>
                <select onChange={onFiltreChange}>
                    {
                        Array.from(filtre_existant).map(
                            (filtre,i) => <option key={i} value={i}>{filtre.name}</option>
                        )
                    }
                </select>
            </div>
            <div className="product__content">
                {
                    medias.map(
                        (media,i) => { return <div key={i} className="product__content__item">
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
            </div>
        </section>
    )
}
export default ContentProfile

ContentProfile.propTypes = {
    reverse: PropTypes.oneOf(['ASC', 'DESC']),
    photographerID: PropTypes.string,
};