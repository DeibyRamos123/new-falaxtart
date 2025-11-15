import React, { useEffect, useState } from 'react'
import '../../styles/PublicationForm.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { uploadPublication } from '../../services/publications.api';
import { useAuth } from '../../hooks/useAuth';
import { useEffectEvent } from 'react';

export function PublicationFormPage() {
  const defaultImg = 'https://i.pinimg.com/736x/13/93/83/139383bbb0d7e611ce57391907c37f7b.jpg';

  const [imgPreview, setImgPreview] = useState(defaultImg);

  const { user, accessToken } = useAuth();

  const navigate = useNavigate();


  const {register, handleSubmit, formState: {errors}, setValue } = useForm();

  // useEffect(() => {
  //     console.log(user.id);
  //     console.log(localStorage.getItem('token'));
  // }, [])


  const handleOnChange = (e) => {
    if(e.target.files[0]){
      const reader = new FileReader();
      reader.onload = (event) => {
        setImgPreview(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const onSubmit = handleSubmit(async data => {
    try {

      const formData = new FormData();
      formData.append('usuario_id', user.id);
      formData.append('platform_publication', data.platform_publication);
      formData.append('tag2', data.tag2);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('for_sale', data.for_sale || false);

      if(data.content && data.content.length > 0){
        formData.append('content', data.content[0]);
      } else {
        console.warn('no se ha seleccionado ningun archivo')
      }

      console.log('Datos a enviar:', {
        usuario_id: user.id,
        title: data.title,
        for_sale: data.for_sale
      }); 

      const res = await uploadPublication(formData);


      navigate('/home');

    } catch (error) {
      console.error('ha ocurrido un error en su solicitud', error);
    }
  })

  return (
    <section className="publication-form-section">
      <form className="publication-form" encType='multipart/form-data' onSubmit={onSubmit}>
        <div className="publication-form__img-upload">
          <img src={imgPreview} alt="image-preview" className='publication-form__image-preview'/>
          <input type="file"
          {...register("content")}
          onChange={handleOnChange}
          accept="image/*"
          className="publication-form__image-btn" 
          />

        </div>
        <div className="publication-form__inputs">
          <h1 className="publication-form__title">Nueva Publicacion</h1>
          <select
          className='publication-form__select-plat'
          {...register('platform_publication', {required: true})}
          defaultValue=""
          >
              <option value="" disabled>Selecciona una plataforma</option>
              <option value="playstation">Playstation</option>
              <option value="xbox">Xbox</option>
              <option value="nintendo">Nintendo</option>
              <option value="pc">PC</option>
              <option value="mobile">Mobile</option>
          </select>

          <select
          className='publication-form__select-cat'
          {...register('tag2', {required: true})}
          defaultValue=""
          >
              <option value="" disabled>Selecciona una categoría</option>
              <option value="help">Help</option>
              <option value="bug">Bug</option>
              <option value="funny">Funny</option>
              <option value="lpt">let's play together</option>
              <option value="other">Other</option>
          </select>

          <input type="text" placeholder='Titulo' 
          className='publication-form__input'
          {...register('title',{required:true})}
          />
          <textarea className='publication-form__input' 
          placeholder='descripción'
          {...register('description',{required:true})}
          />
          <div className="publication-form__checkbox-container">
            <label className='publication-form__label'>
                ¿Publicación premium?
                <input type="checkbox" 
                className='publication-form__checkbox' 
                {...register('for_sale')}
                defaultChecked={false} 
                />
            </label>
          </div>
          <button className='publication-form__upload-btn'>publicar</button>
        </div>
      </form>
    </section>
  )
}
