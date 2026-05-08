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
import { BACKEND_URL } from '../../services/config';

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
    

    const profileImg = usuario?.avatar ? `${BACKEND_URL}/${usuario.avatar}` : null;
    const coverImg = usuario?.cover ? `${BACKEND_URL}/${usuario.cover}` : null;

    const hexToRgba = (hex, opacity) => {
      let r = parseInt(hex.slice(1, 3), 16);
      let g = parseInt(hex.slice(3, 5), 16);
      let b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const glowColor = hexToRgba(usuario.background_divs, 0.3);

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
          glowColor={glowColor}
          params={id}
        />
      </section>

      <section 
      className="publications-section"
      style={{backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
        linear-gradient(to bottom, ${usuario.background_divs} 58%, ${usuario.background} 92%)
        `,
        backgroundAttachment: 'fixed',
        border: `1px solid ${usuario.background_divs}`,
        boxShadow: `0 0 20px ${glowColor}`,
      }}
       >
        {publicaciones.length > 0 ? (
          publicaciones.map(publicacion => (
            <Link to={`/update-publication/${publicacion.id}`} className='publication-link' key={publicacion.id}>
              <UserPublications
                content={`${BACKEND_URL}/${publicacion.content}`}
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
