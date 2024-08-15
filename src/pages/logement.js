// src/pages/Logement.js
import React from 'react';
import { useParams } from 'react-router-dom';
import logements from '../data.json';
import Banner from '../components/banner';
import Carousel from '../components/carousel';
import Dropdown from '../components/dropdown';
import '../assets/scss/logement.scss';

function Logement() {
    const { id } = useParams();
    const logement = logements.find(logement => logement.id === id);

    if (!logement) {
        return <div>Logement non trouvé</div>;
    }

    const generateStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`fa-solid fa-star ${i <= rating ? 'filled' : 'empty'}`}
                ></i>
            );
        }
        return stars;
    };

    return (
        <div>
            <Banner />
            <div className="logement">
                <div className="logement__header">
                    <Carousel pictures={logement.pictures} /> {/* Ajout du carrousel ici */}
                    <div className="logement__info">
                        <h1 className="logement__title">{logement.title}</h1>
                        <p className="logement__location">{logement.location}</p>
                        <div className="logement__tags">
                            {logement.tags.map((tag, index) => (
                                <span key={index} className="logement__tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="logement__host">
                        <p>{logement.host.name}</p>
                        <img src={logement.host.picture} alt={logement.host.name} className="logement__host-picture" />
                        <div className="logement__rating">
                            {generateStars(logement.rating)}
                        </div>
                    </div>

                </div>

                <div className="logement__details">
                    <div><Dropdown title="Description" content={logement.description} /></div>

                    <div><Dropdown
                        title="Équipements"
                        content={
                            <ul>
                                {logement.equipments.map((equipment, index) => (
                                    <li key={index}>{equipment}</li>
                                ))}
                            </ul>
                        }
                    /></div>
                </div>
            </div>
        </div>
    );
}

export default Logement;
