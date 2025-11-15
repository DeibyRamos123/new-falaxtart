import React, { useEffect, useState } from 'react'
import { ObtainPublication } from '../services/publications.api';

export default function usePublicationData(params) {
    const [publication, setPublication] = useState(null);
    const [publicationUser, setPublicationUser] = useState(null);
    const [loadingPublication, setLoadingPublication] = useState(true);

    useEffect(() => {
        const renderPublication = async () => {
            try {
                const response = await ObtainPublication(params.id);
                setPublication(response.data);
                setPublicationUser(response.data.usuario);
            } catch (error) {
                console.error('error al realizar la peticion');
            } finally {
                setLoadingPublication(false);
            }
        }
        renderPublication();
    }, [params.id])

    return { publication, publicationUser, loadingPublication }

}
