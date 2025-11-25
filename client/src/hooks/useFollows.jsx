import React, { useEffect, useState } from 'react'
import { checkFollowStatus, follow, getFollowers, removeFollow } from '../services/follows.api';

export default function useFollows(followerId, followingId, params) {
    // Este es un ejemplo de la función que podrías definir en tu componente o en un hook

    const [siguiendo, setSiguiendo] = useState(false);
    const [followers, setFollowers] = useState(null);
    const [fCount, setFCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    const followData = {
        follower: followerId,
        following: followingId, // El ID del perfil que estás viendo
    };

    const loadFollowers = async () => {
        try {
            const response = await getFollowers(followingId);
            setFollowers(response.data);
            // ✅ AGREGAR: Asegurar que fCount se inicialice con el valor del backend
            setFCount(response.data?.followers_count || 0); 
        } catch (err) {
            console.error('error al cargar el contenido', err)
        }
    }

    useEffect(() => {
        const checkStatus = async () => {
            // Solo comprueba si tienes ambos IDs válidos
            if (followerId && followingId) { 
                try {
                    // 🛑 Llama a la nueva función de API para verificar el estado
                    const result = await checkFollowStatus(followerId, followingId); 
                
                    if (result.data.is_following !== undefined) {
                        setSiguiendo(result.data.is_following);
                    }
                } catch (error) {
                    console.error('Error al verificar el estado de seguimiento:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
                setSiguiendo(false);
            }
        };

        checkStatus();
    // Vuelve a ejecutar si los IDs del usuario o del perfil cambian
    }, [followerId, followingId]);

    useEffect(() => {
        loadFollowers();
    }, [followingId]);

    const handleFollow = async () => {
        try {
            const response = await follow(followData);

            setFCount(prevCount => prevCount + 1);
            setSiguiendo(true);
        } catch (error) {
            console.error('Error de red al intentar seguir:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            const response = await removeFollow(followData);
            setSiguiendo(false);

            setFCount(prevCount => Math.max(0, prevCount - 1));
        } catch (error) {
            console.error('Error de red al intentar seguir:', error);
        }
    }

    return { handleFollow, siguiendo, handleUnfollow, followers, fCount, isLoading }
}
