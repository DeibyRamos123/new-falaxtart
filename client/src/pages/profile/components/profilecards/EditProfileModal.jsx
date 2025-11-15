import { ModalForm } from '../../../../components/ModalForm';
import { useUpdateProfile } from '../../../../hooks/useUpdateProfile';
import { PremiumCard } from '../premium/PremiumCard';

export function EditProfileModal({username, biography, img, coverImg, name, modalState, setModalState, colorTheme, gradientTheme, bgDivsTheme}) {

// ⭐ CLAVE: Extraer la nueva función de actualización de colores y las funciones de RHF
    const { 
        previewProfile, previewCover, onSubmit, 
        coverChange, avatarChange, register,  // Mantener setValue para inicialización si es necesaria
    } = useUpdateProfile(username, name, img, coverImg, biography, setModalState); // Asegúrate de quitar los props de color si ya no inicializas con ellos

    return (
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
        <PremiumCard 
            img={img}
            coverImg={coverImg}
            register={register}
            colorTheme={colorTheme} 
            gradientTheme={gradientTheme}
            bgDivsTheme={bgDivsTheme}
            setModalState={setModalState}
        />
        

        </ModalForm>
    )
}
