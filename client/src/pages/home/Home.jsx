import React, { useEffect, useState } from 'react'
import { ObtainPublications } from '../../services/publications.api';
import { PublicationCard } from './components/publications/PublicationCard';
import '../../styles/Home.css';
import '../../styles/loading.css';
import cargando from '../../assets/loading.gif';
import { useAuth } from '../../hooks/useAuth';

export function Home() {
  const [publications, setPublications] = useState([]);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsuarioInfo() {
      try {
        const response = await ObtainPublications();
        setPublications(response.data);
        setUsers(response.data.usuario);
        setLoading(false);
      } catch (error) {
        console.error('Error: ', error);
        if (error.message && error.response.status == 401) {
          window.location.href = '/'
        }
      }
    }
    loadUsuarioInfo();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <img src={cargando} className="loading-screen__spinner" alt="loading..." />
      </div>
    )
  }


  return (
    <section className="publications-home-section">
      {publications.map(publication => (
        <PublicationCard
          key={publication.id}
          title={publication.title}
          content={`http://localhost:8000/${publication.content}`}
          username={publication.usuario.username}
          avatar={`http://localhost:8000/${publication.usuario.avatar}`}
          usuarioId={publication.usuario.id}
          publicationId={publication.id}
          platform={publication.platform_publication}
          tag={publication.tag2}
          colorTheme={publication.usuario.color_theme}
        />
      ))}
    </section>
  )
}
