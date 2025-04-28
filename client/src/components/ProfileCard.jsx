import React, { useEffect, useState } from 'react'
import './css/ProfileCard.css'
import { ModalForm } from './ModalForm'
import { useForm } from 'react-hook-form';
import { updateUserInfo } from '../api/usuarios.api';

export function ProfileCard({username, img, coverImg, biography, name, currentUser}) {

    const {register, handleSubmit, formState: {errors}, setValue } = useForm();

    const [modalState, setModalState] = useState(false);
    const [previewProfile, setPreviewProfile] = useState(img);
    const [previewCover, setPreviewCover] = useState(coverImg);

    const onClick = () => setModalState(true);

    const defaultImg = 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg';
    const defaultCover = 'https://i.pinimg.com/736x/15/e7/5d/15e75d82a96502ff9a8012a8d3cf7011.jpg';

    useEffect(() => {
        if (name !== undefined) setValue('first_name', name);
        if (biography !== undefined) setValue('biography', biography);
        setPreviewProfile(img || defaultImg);
        setPreviewCover(coverImg || defaultCover);

    },[username, biography,img, coverImg, setValue]);

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


    const onSubmit = handleSubmit( async (data) => {
        try {
            const token = localStorage.getItem('token');
            

            const formData = new FormData();
            formData.append('first_name', data.first_name);
            formData.append('biography', data.biography);

            if (data.avatar && data.avatar.length > 0) {
                formData.append('avatar', data.avatar[0]);
            }

            if (data.cover && data.cover.length > 0) {
                formData.append('cover', data.cover[0]);
            }

            const res = await updateUserInfo(formData,token);

            setModalState(false);
            console.log('usuario actualizado exitosamente');
            window.location.reload();
        } catch (error) {
            console.error('error al hacer la solicitud', error)
        }
    })

  return (
   <section className="profile-info">
        <div className="profile-info__cover">
            <img src={coverImg ? coverImg : defaultCover} alt="cover" className='profile-info__cover-img'/>
        </div>
        <div className="profile-info__user-info">
            <div className="profile-info__user-info-img-text">
                <img src={img ? img : defaultImg } alt="profile image" className="profile-info__user-img" />
                <div className="profile-info__user-text">
                    <h3 className='profile-info__name'>{name ? name : 'John'}</h3>
                    <h4 className='profile-info__username'>{username ? `@${username}` : '@JohnDoe'}</h4>
                    <h4>{biography ? biography : 'Hi im new in falaxart :D'}</h4>
                </div>
            </div>
            {currentUser ? (
                <button className="profile-info__user-edit-profile-btn"> Seguir </button>
            ) : (
                <button className="profile-info__user-edit-profile-btn" onClick={onClick}>Editar perfil</button>
            )
            }
        </div>
        <ModalForm
        estadoModal={modalState}
        cambiarEstado={setModalState}
        title='Editar Perfil'
        >
        <form className='modal-form' onSubmit={onSubmit} encType='multipart/form-data'>
        <div className="modal-form__cover-img-container">
            <img src={previewCover} alt="cover" className='modal-form__cover-img'/>
            <input type="file" 
                {...register('cover')}
                onChange={coverChange}
                accept='image/*'
                className='modal-form__cover-img__input'
                />
        </div>


            <div className="modal-form__profile-img-cointainer">
                <img src={previewProfile} alt="profile image" className="modal-form__profile-img" />
                <input type="file" 
                {...register('avatar')}
                onChange={avatarChange}
                accept='image/*'
                className='modal-form__profile-img__input'
                />
            </div>


            <div className="modal-form__inputs">
                <input type="text" className='modal-form__input' 
                {...register('first_name', {required:true})}
                />
                <textarea className='modal-form__input' 
                {...register('biography', {required: true})}
                />
                <button className='modal-form__btn-submit'> Actualizar </button>
            </div>
        </form>

        </ModalForm>
   </section>
  )
}
