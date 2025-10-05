import React from 'react'
import { NewsCard } from '../components/NewsCard'
import { WorksCard } from '../components/WorksCard'
import { InfoCard } from '../components/InfoCard'
import work from '../assets/work.jpg'
import art from '../assets/art.jpg'
import '../App.css'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function IndexPage() {

  const { user } = useAuth();
  const navigate = useNavigate()

  if (user) {
    navigate('/home')
  }

  return (
    <>
    <section className="news-section">
        <NewsCard/>
    </section>
    <section className="works-info-section">
        <WorksCard image={work}/>
        <WorksCard image={art}/>
        <InfoCard />
    </section>
  </>
  )
}

