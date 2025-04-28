import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { createUsuario, updateUsuario, getUsuario } from '../api/usuarios.api'
import {useNavigate, useParams} from 'react-router-dom'

export function UsuarioFormPage() {


  const { register, handleSubmit, 
  formState: { errors },
  setValue } = useForm();

  const navigate = useNavigate()

  const params = useParams()

  useEffect(() => {
    async function loadUsuario() 
    {
      if (params.id){
        const res = await getUsuario(params.id)
        setValue('username', res.data.username)
        setValue('password', res.data.password)
        setValue('email', res.data.email)
        setValue('first_name', res.data.first_name)
        setValue('last_name', res.data.last_name)
        setValue('date_birth', res.data.date_birth)
        setValue('biography', res.data.biography)
      }
    }
    loadUsuario();
  }, [])

  const onSubmit = handleSubmit(async data => {
    if (params.id){
       await updateUsuario(params.id, data)
    }else {
       await createUsuario(data);
    }
    navigate("/usuario");
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder='username' 
        {...register("username", {required : true})}
        />

        {/* si hay un error en el username devuelve el campo es requerido */}
        {errors.username && <span>este campo es requerido</span>} 
        
        <input type="password" placeholder='password'
        {...register("password", {required : true})}
        />

        {errors.password && <span>este campo es requerido</span>}

        <input type="email" placeholder='email'
        {...register("email", {required : true})}
        />

        {errors.email && <span>este campo es requerido</span>}   

        <input type="text" placeholder='first name'
        {...register("first_name", {required : true})}
        />

        {errors.first_name && <span>este campo es requerido</span>}

        <input type="text" placeholder='last name'
        {...register("last_name", {required : true})}
        />

        {errors.last_name && <span>este campo es requerido</span>}   

        <input type="date" placeholder='date of birth'
        {...register("date_birth", {required : true})}
        />

        {errors.date_birth && <span>este campo es requerido</span>}

        <textarea type="text" placeholder='biography'
        {...register("biography", {required : true})}
        />

        {errors.biography && <span>este campo es requerido</span>}

        <button>Submit</button>
      </form>
      {
        params.id && (<button>delete</button>)
      }
    </div>
  )
}

