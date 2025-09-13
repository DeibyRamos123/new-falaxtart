import React from 'react'
import '../../styles/ProfileMenu.css'
import { Link, useNavigate } from 'react-router-dom';

export function ProfileMenu({avatar, username, linkState, setLinkState, id}) {
    const defaultImg = 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg';
    const navigate = useNavigate();

    const handleLoguot = ()=> {
        localStorage.removeItem('token');
        navigate('/');
    }
    
  return (
    <div className="profile-menu">
        <img src={avatar ? avatar : defaultImg } alt={username ? username : 'No hay username'} className='profile-menu__avatar'/>
        <nav className={`profile-menu__links ${linkState ? 'profile-menu__links--active': ''}`}>
            <Link to={`/profile/${id}`} className='profile-menu__links__element'>Profile</Link>
            <a href="#" className="profile-menu__links__element">settings</a>
            <a href="#" className="profile-menu__links__element">settings</a>
            <button className="profile-menu__links__element" onClick={handleLoguot}>Log out</button>
        </nav>
    </div>
  )
}

