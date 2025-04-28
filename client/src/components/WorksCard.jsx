import React from 'react'
import './css/WorksCard.css'

export function WorksCard({ image }) {
  return (
    <div className="works-card">
        <img src={image} alt="" className="works-card__image" />
        <a href="#" className='work-card__text'>Learn more</a>
    </div>
  )
}

