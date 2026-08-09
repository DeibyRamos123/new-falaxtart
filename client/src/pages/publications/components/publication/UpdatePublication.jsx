import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../../../../styles/updatePub.css'
import '../../../../styles/loading.css';
import cargando from '../../../../assets/loading.gif';
import { useIsDifferentUser } from '../../../../hooks/useIsDifferentUser';
import usePublicationData from '../../../../hooks/usePublicationData';
import PublicationButtons from './PublicationButtons';
import PublicationComments from '../comments/PublicationComments';
import { BACKEND_URL } from '../../../../services/config';
import { PublicationUserInformation } from './PublicationUserInformation';

export function UpdatePublication() {
    const params = useParams();
    const { publication, publicationUser, loadingPublication } = usePublicationData(params);

    const isDifferentUser = useIsDifferentUser(publicationUser?.id);


    if (loadingPublication || isDifferentUser === null) {
        return (
            <div className="loading-screen">
                <img src={cargando} className="loading-screen__spinner" alt="loading..." />
            </div>
        )
    }

    const user_avatar = `${BACKEND_URL}/${publicationUser.avatar}`;

    return (
        <section className="publication-section">
            <div className="publication">
                <div className="publication-image-container">
                    <img
                        src={`${BACKEND_URL}/${publication.content}`}
                        alt={publication.title}
                        className="publication-image-container__publication-img"
                    />
                </div>

                <PublicationUserInformation
                    userAvatar={user_avatar}
                    publicationUser={publicationUser}
                    createdAt={publication.created_at}
                />

                <div className="publication-text-context">
                    <p className='publication-title__label' style={{ display: 'none' }}> title</p>
                    <div className="publication-title-button">
                        <h2 className='publication-title'>{publication.title}</h2>
                        <PublicationButtons
                            isDifferentUser={isDifferentUser}
                        />
                    </div>
                    <p className='publication-title__label' style={{ display: 'none' }}>Description </p>
                    <p className='publication-description'>{publication.description}</p>
                </div>
            </div>

            <PublicationComments
                user_avatar={user_avatar}
                publicationUser={publicationUser}
            />

        </section>
    )
}

