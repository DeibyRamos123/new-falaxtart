import React, { useEffect, useState } from 'react'
import { ObtainPublications } from '../../services/usuarios.api';
import { PublicationCard } from '../profile/components/publication/PublicationCard';
import '../../styles/Home.css';
import '../../styles/loading.css';
import cargando from '../../assets/loading.gif';

export function Home() {
  const [publications, setPublications] = useState([]);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsuarioInfo() {
      try {
        const response = await ObtainPublications();
        console.log(response.data)
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
          title={publication.title}
          content={`http://localhost:8000/${publication.content}`}
          username={publication.usuario.username}
          avatar={`http://localhost:8000/${publication.usuario.avatar}`}
          usuarioId={publication.usuario.id}
          publicationId={publication.id}
        />
      ))}
    </section>
  )
}
