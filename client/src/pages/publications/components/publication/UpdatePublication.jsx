import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../../../../styles/updatePub.css'
import '../../../../styles/loading.css';
import cargando from '../../../../assets/loading.gif';
import { useIsDifferentUser } from '../../../../hooks/useIsDifferentUser';
import usePublicationData from '../../../../hooks/usePublicationData';
import PublicationButtons from './PublicationButtons';
import PublicationComments from '../comments/PublicationComments';

export function UpdatePublication() {
    const params = useParams();
    const { publication, publicationUser, loadingPublication } = usePublicationData(params);

    const isDifferentUser = useIsDifferentUser(publicationUser?.id);


    if ( loadingPublication || isDifferentUser === null ) {
        return (
            <div className="loading-screen">
                <img src={cargando} className="loading-screen__spinner" alt="loading..." />
            </div>
        )
    }

    const user_avatar = `http://localhost:8000/${publicationUser.avatar}`;


    return (
        <section className="publication-section">
            <div className="publication">
                <div className="publication-image-container">
                    <img 
                    src={`http://localhost:8000/${publication.content}`} 
                    alt={publication.title} 
                    className="publication-image-container__publication-img" 
                    />
                </div>
                <div className="publication-text-context">
                    <p className='publication-title__label'> title</p>
                    <h2 className='publication-title'>{publication.title}</h2>
                    <p className='publication-title__label'>Description </p>
                    <p className='publication-description'>{publication.description}</p>
                    <PublicationButtons
                    isDifferentUser={isDifferentUser}
                    />
                </div>
            </div>

            <PublicationComments
            user_avatar={user_avatar}
            publicationUser={publicationUser}
            />

        </section>
    )
}

