import React from 'react'
import Image from '../assets/promo.jpg'
import '../styles/NewsCard.css'

export function NewsCard() {
  return (
    <div className="news-card">
        <div className="news-card__text">
            <h1 className="news-card__text__title">Welcome to FALAXART</h1>
            <p className="news-card__text__content">
                Take your artistic journey to the next level with FALAXART
                the world’s premier platform for creators ready to update a
                nd elevate their work. Unlock a wealth of incredible benefits—whether
                it’s refining your skills, accessing cutting-edge tools, or gaining
                exposure to a vibrant global community of art lovers and professionals.
                Join today!
            </p>
        </div>
        <img src={Image} alt="welcome" className="news-card__promocional-img" />
    </div>
  )
}
