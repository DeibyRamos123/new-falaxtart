import React from 'react'
import { useAuth } from '../../../../hooks/useAuth'
import useFollows from '../../../../hooks/useFollows';

export function ProfileButtons({ currentUser, onClick, userProfileID, params }) {

    const  { accessToken, user } = useAuth();

    const { handleFollow, siguiendo, handleUnfollow, isLoading } = useFollows(user.id, userProfileID);

    if (isLoading && accessToken) {
        return (
            <div>
                <button className="profile-info__user-edit-profile-btn" disabled>
                    Seguir
                </button>
            </div>
        );
    }


    if (!currentUser) {
        return (
            <div>
                <button 
                    className="profile-info__user-edit-profile-btn" 
                    onClick={onClick}
                >
                    Editar perfil
                </button>
            </div>
        );
    } 
    
    // 2. Si no está logeado (y no es su perfil, ya excluido por el if anterior), no hacemos nada o mostramos solo "Seguir" deshabilitado.
    if (accessToken == null) {
        return (
            <div>
                <button 
                    className="profile-info__user-edit-profile-btn" 
                    disabled
                >
                    Seguir
                </button>
            </div>
        );
    }

    // A partir de aquí, sabemos que NO es el perfil propio y el usuario está LOGEADO.
    
    // 3. Si ya está siguiendo, muestra 'Dejar de seguir'.
    if (siguiendo) {
        return (
            <div>
                <button 
                    className="profile-info__user-edit-profile-btn" 
                    onClick={handleUnfollow} // 🛑 Necesitas crear esta función para DELETE
                >
                    Dejar de seguir
                </button>
            </div>
        );
    } 
    
    // 4. Si NO está siguiendo, muestra 'Seguir'.
    return (
        <div>
            <button 
                className="profile-info__user-edit-profile-btn" 
                onClick={handleFollow} // Esta función debe hacer el POST
            >
                Seguir
            </button>
        </div>
    );
}
