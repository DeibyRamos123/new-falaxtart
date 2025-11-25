import React, { useEffect, useState } from 'react'
import { profileUsuario } from '../../services/usuarios.api'
import { loadUserPublications } from '../../services/publications.api';
import { ProfileCard } from './components/profilecards/ProfileCard';
import '../../styles/ProfilePage.css'
import { UserPublications } from './components/publication/UserPublications';
import { Link, useParams } from 'react-router-dom';
import cargando from '../../assets/loading.gif';
import { useProfileData } from '../../hooks/useProfileData';
import { useIsDifferentUser } from '../../hooks/useIsDifferentUser';

export function Profile() {
    const { id } = useParams();
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
          userID={usuario.id}
          username={usuario.username}
          biography={usuario.biography}
          img={profileImg}
          coverImg={coverImg}
          name={usuario.first_name}
          currentUser={isDifferentUser}
          premium={usuario.premium}
          colorTheme={usuario.color_theme}
          bgTheme={usuario.background}
          bgDivsTheme={usuario.background_divs}
          params={id}
        />
      </section>

      <section 
      className="publications-section"
      style={{backgroundImage: `linear-gradient(to bottom, ${usuario.background_divs} 58%, ${usuario.background} 92%)`}}
       >
        {publicaciones.length > 0 ? (
          publicaciones.map(publicacion => (
            <Link to={`/update-publication/${publicacion.id}`} className='publication-link' key={publicacion.id}>
              <UserPublications
                content={`http://127.0.0.1:8000/${publicacion.content}`}
                title={publicacion.title}
                avatar={profileImg}
                platform={publicacion.platform_publication}
                tag={publicacion.tag2}
                colorTheme={publicacion.usuario.color_theme}
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
