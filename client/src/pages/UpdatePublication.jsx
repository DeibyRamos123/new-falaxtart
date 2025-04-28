import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ObtainPublication } from '../api/usuarios.api';
import '../components/css/updatePub.css'

export function UpdatePublication() {

    const { id } = useParams();
    const [publication, setPublication] = useState([]);
    const [userInfo, setUserInfo] = useState([])


    useEffect(() => {
        const renderPublication = async () => {
            try {
                const response = await ObtainPublication(id);
                console.log(response.data);
                setPublication(response.data)
                setUserInfo(response.data.usuario)
            } catch (error) {
                console.error('error al realizar la peticion');
            }
        }
        renderPublication();
    }, [])

    const user_avatar = `http://localhost:8000/${userInfo.avatar}`


  return (
    <section className="publication-section">
        <div className="publication">
            <div className="publication-image-container">
                <img src={`http://localhost:8000/${publication.content}`} alt={publication.title} className="publication-image-container__publication-img" />
            </div>
            <div className="publication-text-context">
                    <h2 className='publication-title'>{publication.title}</h2>
                    <p>{publication.description}</p>
            </div>
        </div>
        <section className="publication-info-section">
            <div className="publication-user">
                <div className="publication-user-section__avatar">
                    <img src={user_avatar} alt="" className="user__avatar" />
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

