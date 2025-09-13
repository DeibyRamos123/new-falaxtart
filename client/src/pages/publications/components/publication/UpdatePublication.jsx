import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ObtainPublication } from '../../../../services/usuarios.api';
import '../../../../styles/updatePub.css'
import '../../../../styles/loading.css';
import cargando from '../../../../assets/loading.gif';

export function UpdatePublication() {

    const { id } = useParams();
    const [publication, setPublication] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sameUser, setSameUser] = useState(false);

    const params = useParams();


    useEffect(() => {
        const renderPublication = async () => {
            try {
                const response = await ObtainPublication(id);
                console.log(response.data);
                setPublication(response.data)
                setUserInfo(response.data.usuario)
                setLoading(false);
            } catch (error) {
                console.error('error al realizar la peticion');
            }
        }
        renderPublication();
    }, [params.id])

    useEffect(() => {
        let currentUser = parseInt(localStorage.getItem('SessionId'));
        console.log(curre)
        let publicationUserID = parseInt(userInfo.id);

        if (currentUser != publicationUserID) {
            setSameUser(true);
        } else {
            setSameUser(false);
        }
    }, [params.id])


    if (loading) {
        return (
            <div className="loading-screen">
                <img src={cargando} className="loading-screen__spinner" alt="loading..." />
            </div>
        )
    }

    const user_avatar = `http://localhost:8000/${userInfo.avatar}`
    console.log(sameUser)




    return (
        <section className="publication-section">
            <div className="publication">
                <div className="publication-image-container">
                    <img src={`http://localhost:8000/${publication.content}`} alt={publication.title} className="publication-image-container__publication-img" />
                </div>
                <div className="publication-text-context">
                    <p className='publication-title__label'> title</p>
                    <h2 className='publication-title'>{publication.title}</h2>
                    <p className='publication-title__label'>Description </p>
                    <p className='publication-description'>{publication.description}</p>
                    {sameUser ? (
                        <button className="profile-info__user-edit-profile-btn"> q </button>
                    ) : (
                        <button className="profile-info__user-edit-profile-btn" onClick={onClick}>Editar Publicacion</button>
                    )
                    }
                    
                </div>
            </div>
            <section className="publication-info-section">
                <div className="publication-user">
                    <div className="publication-user-section__avatar">
                        <Link to={`/profile/${userInfo.id}`}>
                            <img src={user_avatar} alt="" className="user__avatar" />
                        </Link>
                    </div>
                    <div className="publication-user__names">
                        <p className="user-first-name">{userInfo.first_name}</p>
                        <p className="user-username">{`@${userInfo.username}`}</p>
                    </div>
                </div>
            </section>
        </section>
    )
}

