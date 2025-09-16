import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { updateUserInfo } from '../services/usuarios.api';

export function useUpdateProfile(username, name, img, coverImg, biography, setModalState) {
    const {register, handleSubmit, formState: {errors}, setValue } = useForm();

    const [previewProfile, setPreviewProfile] = useState(img);
    const [previewCover, setPreviewCover] = useState(coverImg);

    useEffect(() => {
        if (name !== undefined) setValue('first_name', name);
        if (biography !== undefined) setValue('biography', biography);
        setPreviewProfile(img || defaultImg);
        setPreviewCover(coverImg || defaultCover);

    }, [username, biography, img, coverImg, setValue]);

    const avatarChange = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewProfile(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const coverChange = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewCover(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    const onSubmit = handleSubmit(async (data) => {
        try {
            const token = localStorage.getItem('access_token');


            const formData = new FormData();
            formData.append('first_name', data.first_name);
            formData.append('biography', data.biography);

            if (data.avatar && data.avatar.length > 0) {
                formData.append('avatar', data.avatar[0]);
            }

            if (data.cover && data.cover.length > 0) {
                formData.append('cover', data.cover[0]);
            }

            const res = await updateUserInfo(formData, token);

            setModalState(false);
            console.log('usuario actualizado exitosamente');
            window.location.reload();
        } catch (error) {
            console.error('error al hacer la solicitud', error)
        }
    })

    return {previewProfile, previewCover, onSubmit, coverChange, avatarChange, register }
}
