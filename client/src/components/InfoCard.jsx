import React from 'react'
import '../styles/InfoCard.css'
export function InfoCard() {
  return (
    <div className="info-list">
        <div className="info-list__element">
            <h3 className="info-list__element__title">About us</h3>
            <p className="info-list__element__description">
                Falaxart was been developed by BitterDev. The first time
                like a project of the school now like a personal project where
                he put all him knowledge about creation of web sites 
            </p>
        </div>
        <div className="info-list__element">
            <h3 className="info-list__element__title">About Falaxart</h3>
            <p className="info-list__element__description">
                FALAXART is a social media based in art. Searching the people
                can comunicate with their favorites authors, have anuncements
                and a cleanes interface for a best user experience.
            </p>
        </div>
        <div className="info-list__element">
            <h3 className="info-list__element__title">Mision</h3>
            <p className="info-list__element__description">
                the mision of this site is give authors and fans a plataform
                where they can comunicate both parts, and have the best experience
                in terms of art
            </p>
        </div>
    </div>
  )
}

