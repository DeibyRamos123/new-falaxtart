import { useState, useEffect } from "react";
import { profileUsuario } from "../services/usuarios.api";
import { loadUserPublications } from "../services/publications.api";


export function useProfileData(userId) {
    const [usuario, setUsuario] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData =  async () => {
            try {
                // obtenemos respuestas de ambos amigos 👀
                const [userResponse, publicationsResponse] = await Promise.all([
                    profileUsuario(userId),
                    loadUserPublications(userId)
                ]);

                setUsuario(userResponse.data);
                setPublicaciones(publicationsResponse.data);
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [userId]);

    return {usuario, publicaciones, loading, error};
}