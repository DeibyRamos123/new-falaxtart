import React, { useEffect, useState } from 'react'
import { profileUsuario } from '../../services/usuarios.api'
import { loadUserPublications } from '../../services/publications.api';
import { ProfileCard } from './components/profilecards/ProfileCard';
import '../../styles/ProfilePage.css'
import { UserPublications } from './components/publication/UserPublications';
import { Link, useParams } from 'react-router-dom';
import cargando from '../../assets/loading.gif';
import { useAuth } from '../../hooks/useAuth';
import { useProfileData } from '../../hooks/useProfileData';
import { useIsDifferentUser } from '../../hooks/useIsDifferentUser';

export function Profile() {
    const { id } = useParams();
    const { bgDivsTheme, gradientTheme } = useAuth();
    const { usuario, publicaciones, loading, error } = useProfileData(id);
    const isDifferentUser = useIsDifferentUser(usuario?.id);

    if (loading) {
        return (
            <div className="loading-screen">
                <img src={cargando} className="loading-screen__spinner" alt="loading..." />
            </div>
        );
    }

    if (error) {
        return <p>Ocurrió un error al cargar el perfil.</p>;
    }

    const profileImg = usuario?.avatar ? `http://127.0.0.1:8000/${usuario.avatar}` : null;
    const coverImg = usuario?.cover ? `http://127.0.0.1:8000/${usuario.cover}` : null;

    return (
    <>
      <section className="profile-section">
        <ProfileCard
          username={usuario.username}
          biography={usuario.biography}
          img={profileImg}
          coverImg={coverImg}
          name={usuario.first_name}
          currentUser={isDifferentUser}
          premium={usuario.premium}
          colorTheme={usuario.color_theme}
          bgDivsTheme={usuario.background_divs}
          gradientTheme={usuario.gradient_theme}

        />
      </section>

      <section 
      className="publications-section"
      style={{backgroundImage: `linear-gradient(to bottom, ${bgDivsTheme}, ${gradientTheme})`}}
       >
        {publicaciones.length > 0 ? (
          publicaciones.map(publicacion => (
            <Link to={`/update-publication/${publicacion.id}`} className='publication-link' key={publicacion.id}>
              <UserPublications
                content={`http://127.0.0.1:8000/${publicacion.content}`}
                title={publicacion.title}
                avatar={profileImg}
              />
            </Link>
          ))
        ) : (
          <p> No publications yet :(</p>
        )}
      </section>
    </>
  );

}
