import React, { useEffect, useState } from 'react'
import { ObtainPublications } from '../api/usuarios.api';
import { PublicationCard } from '../components/PublicationCard';
import '../components/css/Home.css'

export function Home() {
    const [publications, setPublications] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
      async function loadUsuarioInfo() {
        try {
          const response = await ObtainPublications();
          console.log(response.data)
          setPublications(response.data);
          setUsers(response.data.usuario);
        } catch (error) {
          console.error('Error: ', error);
          if (error.message && error.response.status == 401) {
            window.location.href = '/'
          }
        }
      }
      loadUsuarioInfo();
    }, []);

    
  return (
    <section className="publications-home-section">
        {publications.map(publication => (
          <PublicationCard
          title={publication.title}
          content={`http://localhost:8000/${publication.content}`}
          username={publication.usuario.username}
          avatar={`http://localhost:8000/${publication.usuario.avatar}`}
          usuarioId={publication.usuario.id}
          />
        ))}
    </section>
  )
}
