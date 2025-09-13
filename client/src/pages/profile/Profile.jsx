import React, { useEffect, useState } from 'react'
import { loadUserPublications, profileUsuario } from '../../services/usuarios.api';
import { ProfileCard } from './components/profilecards/ProfileCard';
import '../../styles/ProfilePage.css'
import { UserPublications } from '../../components/UserPublications';
import { Link, useParams } from 'react-router-dom';
import cargando from '../../assets/loading.gif';

export function Profile() {

    const [usuario, setUsuario] = useState([]);
    const [difUser,setDifUser] = useState(false);
    const [publicaciones, setPublicacion] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    const imagen = `http://127.0.0.1:8000/${usuario.avatar}`;
    const imagen_cover = `http://127.0.0.1:8000/${usuario.cover}`;

    const biography = usuario.biography;
    const userId = usuario.id;
    let publicaciones_existentes = false

    useEffect(() => {
        async function loadUsuario() {
            try {
                const response = await profileUsuario(params.id);
                setUsuario(response.data);
                console.log('respuesta del servidor: ', response.data);
                setLoading(false);
            } catch (error){
                console.error('error al hacer la peticion: ', error);
            }            
        }
        loadUsuario();
    }, [params.id])

    useEffect(() => {
        let currentUser = parseInt(localStorage.getItem('SessionId'));
        let queryUser = parseInt(params.id);
    
        if (currentUser != queryUser) {
            setDifUser(true);
        } else {
            setDifUser(false);
        }
    }, [params.id])


    useEffect(()=>{
        async function loadPublication() {
            try {
                const res = await loadUserPublications(params.id);
                setPublicacion(res.data)
                console.log('respuesta de la publicación:', res.data);
            } catch (error){
                console.error('error al cargar las publicaciones', error);
            }
        }
        loadPublication();
    },[])



    if (publicaciones.length > 0 ) {
        publicaciones_existentes = true
    } else {
        publicaciones_existentes = false
    }

    if (loading) {
        return (
            <div className="loading-screen">
                <img src={cargando} className="loading-screen__spinner" alt="loading..." />
            </div>
        )
    }

  return (
    <>
        <section className="profile-section">
            <ProfileCard  
            username={usuario.username} 
            biography={biography} 
            img={imagen}
            coverImg={imagen_cover}
            name={usuario.first_name}
            currentUser={difUser}
            />
        </section>

        {publicaciones_existentes &&
        <section className="publications-section">
            {publicaciones.map(publicacion => (
                <Link to={`/update-publication/${publicacion.id}`} className='publication-link'>
                <UserPublications
                key={publicacion.id}
                content={`http://127.0.0.1:8000/${publicacion.content}`} 
                title={publicacion.title} 
                avatar={imagen} />
                </Link>
            ))}
        </section>
        }
    </>
  )
}
