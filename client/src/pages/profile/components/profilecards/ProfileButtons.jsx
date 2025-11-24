import React from 'react'
import { useAuth } from '../../../../hooks/useAuth'

export function ProfileButtons({ currentUser, onClick, userProfileID }) {

    const  { accessToken } = useAuth();

    return (
        <div>
            {currentUser || accessToken == null ? (
                <button className="profile-info__user-edit-profile-btn">Seguir</button>
            ) : (
                <button className="profile-info__user-edit-profile-btn" onClick={onClick}>Editar perfil</button>
            )}
        </div>
    )
}
