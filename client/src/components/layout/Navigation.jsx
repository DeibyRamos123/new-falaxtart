import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import '../../styles/header.css'
import { ModalForm } from '../ModalForm';
import '../../styles/Forms.css'
import { useForm } from 'react-hook-form';
import { createUsuario, homeUsuario, loginUsuario } from '../../services/usuarios.api';
import { ProfileMenu } from '../ui/ProfileMenu';
import { useAuth } from '../../hooks/useAuth';

export function Navigation() {

  const [EstadoModal1, setEstadoModal1] = useState(false);
  const [EstadoModal2, setEstadoModal2] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [linkState, setLinkState] = useState(false);

  const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin } } = useForm();
  const { register: registerSignup, handleSubmit: handleSubmitSignup, formState: { errors: errorsSignup } } = useForm();


  const { login, user, loadUser, isAuthenticated, accessToken } = useAuth();

  const abrir1 = () => setEstadoModal1(true);
  const abrir2 = () => setEstadoModal2(true);
  const abrirMenu = () => {
    if (linkState) {
      setLinkState(false);
    } else {
      setLinkState(true);
    }
  }

  const navigate = useNavigate();


  let imagen = 'https://i.pinimg.com/736x/c9/23/cf/c923cfe92ff14e0953c694f3f3df022a.jpg';

  if (user?.avatar) {
    imagen = `http://127.0.0.1:8000/${user.avatar}`;
  }


  // hay que crear una variable para manejar la funcion de envio de datos e igualarla a la funcion hecha para mandar los datos
  // handlesubmit y luego se pasa al evento
  const Submit = handleSubmitSignup(async (data) => {
    try {
      const response = await createUsuario(data);
      console.log('respuesta del servidor', response)
      setMensajeExito(true);
      setTimeout(() => {
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
      const tokenData = response.data.token;
      const userData = response.data.user;

      setMensajeExito(true);
      setErrorMessage('');
      setTimeout(async () => {
        setEstadoModal1(false);
        setMensajeExito(false);
        login(userData, tokenData); // actualiza contexto
        await loadUser();
        navigate('/home');
      }, 1000);
    } catch (error) {
      console.error('error al logear al usuario: ', error);
      setErrorMessage('usuario o contraseña invalidos');
      setTimeout(() => setErrorMessage(''), 2000);
    }
  });

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
                  username={user?.username || 'John Doe'}
                  avatar={imagen}
                  linkState={linkState}
                  id={user?.id || '1'}
                  setLinkState={setLinkState} />
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
                {...registerLogin("username", { required: true })}
              />
            </div>

            <div className="login-form__group">
              <label>Password</label>
              {errorsLogin.password && <span className="login-form__error">este campo es requerido</span>}
              <input type="password" placeholder="Password" className="login-form__input"
                {...registerLogin("password", { required: true })}
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
                {...registerSignup("username", { required: true })}
              />
            </div>
            <div className="login-form__group">
              <label>Email</label>
              {errorsSignup.email && <span className="login-form__error">este campo es requerido</span>}
              <input type="email" placeholder="Password" className="login-form__input"
                {...registerSignup('email', { required: true })}
              />
            </div>
            <div className="login-form__group">
              <label>Password</label>
              {errorsSignup.password && <span className="login-form__error">este campo es requerido</span>}
              <input type="password" placeholder="Password" className="login-form__input"
                {...registerSignup('password', { required: true })}
              />
            </div>
            <div className="login-form__group">
              <label>firts_name</label>
              {errorsSignup.first_name && <span className="login-form__error">este campo es requerido</span>}
              <input type="text" placeholder="First name" className="login-form__input"
                {...registerSignup('first_name', { required: true })}
              />
            </div>
            <div className="login-form__group">
              <label>last_name</label>
              {errorsSignup.last_name && <span className="login-form__error">este campo es requerido</span>}
              <input type="text" placeholder="Last name" className="login-form__input"
                {...registerSignup('last_name', { required: true })}
              />
            </div>
            <div className="login-form__group">
              <label>fecha de nacimiento</label>
              {errorsSignup.date_birth && <span className="login-form__error">este campo es requerido</span>}
              <input type="date" placeholder="Fecha de nacimiento" className="login-form__input"
                {...registerSignup('date_birth', { required: true })}
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

