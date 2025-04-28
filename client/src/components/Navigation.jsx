import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import './css/header.css'
import { ModalForm } from './ModalForm';
import './css/Forms.css'
import { useForm } from 'react-hook-form';
import { createUsuario, homeUsuario, loginUsuario } from '../api/usuarios.api';
import { ProfileMenu } from './ProfileMenu';

export function Navigation() {

  const [EstadoModal1, setEstadoModal1] = useState(false);
  const [EstadoModal2, setEstadoModal2] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [usuario, setUsuario] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [linkState, setLinkState] = useState(false);

  const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin } } = useForm();
  const { register: registerSignup, handleSubmit: handleSubmitSignup, formState: { errors: errorsSignup } } = useForm();
      
  const abrir1 = () =>  setEstadoModal1(true);
  const abrir2 = () =>  setEstadoModal2(true);
  const abrirMenu = () => {
    if (linkState) {
      setLinkState(false);
    } else {
      setLinkState(true);
    }
  }

  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
      async function loadUsuarioInfo() {
        try {
          const response = await homeUsuario();
          setUsuario(response.data);
          localStorage.setItem('SessionId', response.data.id)
        } catch (error) {
          console.error('Error: ', error);
          if (error.message && error.response.status == 401) {
            console.error('acceso denegado')
          }
        }
      }
      loadUsuarioInfo();
  }, []);

  const imagen = `http://127.0.0.1:8000/${usuario.avatar}`;


  // hay que crear una variable para manejar la funcion de envio de datos e igualarla a la funcion hecha para mandar los datos
  // handlesubmit y luego se pasa al evento
  const Submit = handleSubmitSignup(async (data) => {
    try{
      const response = await createUsuario(data);
      console.log('respuesta del servidor', response)
      setMensajeExito(true);
      setTimeout(()=> {
        setEstadoModal2(false);
        setMensajeExito(false);
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error("error al crear el usuario:", error)
    }
  })

  const onSubmit = handleSubmitLogin(async (data) => {
    try {
      const response = await loginUsuario(data);
      console.log("Respuesta del servidor:", response.data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setMensajeExito(true);
      setErrorMessage('');
      setTimeout(()=>{
        setEstadoModal1(false);
        setMensajeExito(false);
        navigate('/home');
      }, 1000)
    } catch (error){
      console.error('error al logear al usuario: ', error);
      setErrorMessage('usuario o contraseña invalidos');
      setTimeout(()=>{
        setErrorMessage('');
      }, 2000)
    }
  })



  
  return (
    <div>
        
          <header className="header">
          <Link to={isAuthenticated ? '/home' : '/indexpage'} className='header__link'>
            <div className="header__logo">
              <img className="logo" src={logo} alt="logo" />
              <h1 className='header__title'>FALAXART</h1>
            </div>
          </Link>
            <div className="buttons-auth">
              {isAuthenticated ? (
                <>
                  <Link to='/upload-publication' className='button-upload-work'>Upload</Link>
                  <button className='button-profile-info' onClick={abrirMenu}>
                    <ProfileMenu 
                    username={usuario.username} 
                    avatar={imagen} 
                    linkState={linkState} 
                    id={usuario.id}
                    setLinkState={setLinkState}/>
                  </button>
                </>
              ) : (
              <>
                <button className="buttons-auth__login" onClick={abrir1}>Log in</button>
                <button className="buttons-auth__sign-up" onClick={abrir2}>Sign up</button>
              </>
            )}
            </div>
          </header>

          <ModalForm
          estadoModal={EstadoModal1}
          cambiarEstado={setEstadoModal1}
          title='Log in'
          >
            <section className="login-section">
                <span className={`login-section__message ${errorMessage ? 'login-section__message--open' : ''}`}>{errorMessage}</span>
                <span className={`login-section__message ${mensajeExito ? 'login-section__message--open' : ''}`}>Usuario logeado correctamente</span>
              <form className="login-form" onSubmit={onSubmit}>
                <div className="login-form__group">
                  <label>Username</label>
                  {errorsLogin.username && <span className="login-form__error">este campo es requerido</span>} 
                  <input type="text" placeholder="Username" className="login-form__input" 
                  {...registerLogin("username", {required: true})}
                  />
                </div>

                <div className="login-form__group">
                  <label>Password</label>
                  {errorsLogin.password && <span className="login-form__error">este campo es requerido</span>} 
                  <input type="password" placeholder="Password" className="login-form__input"
                  {...registerLogin("password", {required: true})}
                  />
                </div>
                <button className="login-form__button">Login</button>
              </form>
            </section>
          </ModalForm>

          <ModalForm 
          estadoModal={EstadoModal2}
          cambiarEstado={setEstadoModal2}
          title='Sign up'
          >
            <section className="login-section">
              {mensajeExito && 
                <span className='login-section__message'>Usuario creado exitosamente!</span>
              }
              <form className="login-form" onSubmit={Submit}>
                <div className="login-form__group">
                  <label>Username</label>
                  {errorsSignup.username && <span className="login-form__error">este campo es requerido</span>} 
                  <input type="text" placeholder="Username" className="login-form__input" 
                  {...registerSignup("username", {required : true})}
                  />
                </div>
                <div className="login-form__group">
                  <label>Email</label>
                  {errorsSignup.email && <span className="login-form__error">este campo es requerido</span>} 
                  <input type="email" placeholder="Password" className="login-form__input" 
                  {...registerSignup('email', {required: true})}
                  />
                </div>
                <div className="login-form__group">
                  <label>Password</label>
                  {errorsSignup.password && <span className="login-form__error">este campo es requerido</span>} 
                  <input type="password" placeholder="Password" className="login-form__input" 
                  {...registerSignup('password', {required: true})}
                  />
                </div>
                <div className="login-form__group">
                  <label>firts_name</label>
                  {errorsSignup.first_name && <span className="login-form__error">este campo es requerido</span>}
                  <input type="text" placeholder="First name" className="login-form__input"
                  {...registerSignup('first_name', {required: true})}
                  /> 
                </div>
                <div className="login-form__group">
                  <label>last_name</label>
                  {errorsSignup.last_name && <span className="login-form__error">este campo es requerido</span>} 
                  <input type="text" placeholder="Last name" className="login-form__input" 
                  {...registerSignup('last_name', {required: true})}
                  />
                </div>
                <div className="login-form__group">
                  <label>fecha de nacimiento</label>
                  {errorsSignup.date_birth && <span className="login-form__error">este campo es requerido</span>}
                  <input type="date" placeholder="Fecha de nacimiento" className="login-form__input" 
                  {...registerSignup('date_birth', {required: true})}
                  /> 
                </div>
                <button className="login-form__button">Sign up</button>
              </form>
            </section> 
          </ModalForm>

        {/* <Link to="/usuario-registrar">Registrar un usuario</Link> */}
    </div>
  )
}

