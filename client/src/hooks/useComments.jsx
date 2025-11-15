import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from './useAuth';
import { createComment, getComments } from '../services/comments.api';

export default function useComments(params) {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const [comment, setComments] = useState([]);
    const [loadingComment, setLoadingComment] = useState(true);

    const loadComments = async () => {
        try {
            const response = await getComments(params.id);
            setComments(response.data);
        } catch (err) {
            console.error('error al cargar el contenido')
        } finally {
            setLoadingComment(false);
        }
    }

    const onSubmitComment = handleSubmit(async (data) => {
        console.log('datos a enviar ' + data);
        try {
            const formData = new FormData();
            formData.append('usuario', user.id)
            formData.append('publication', params.id),
            formData.append('contenido',data.contenido)

            const res = await createComment(formData);

            setComments(prev => [res.data, ...prev]);

            reset();

            await loadComments();

            console.log('Respuesta de la API:', res);

        } catch (err) {
            console.error(`Error al subir el comentario ${err}`)
        }
    })

    useEffect(() => {
        loadComments();
        setLoadingComment(false);
    }, [params.id])
    
    return {register, comment, loadingComment, onSubmitComment}
}
