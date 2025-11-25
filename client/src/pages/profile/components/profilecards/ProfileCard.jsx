import React, { useEffect, useState } from 'react'
import '../../../../styles/ProfileCard.css'
import { updateUserInfo } from '../../../../services/usuarios.api';
import { useAuth } from '../../../../hooks/useAuth';
import { ProfileButtons } from './ProfileButtons';
import { EditProfileModal } from './EditProfileModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import FollowCount from '../follows/FollowCount';

export function ProfileCard({ username, img, coverImg, biography, name, currentUser, premium, colorTheme, bgTheme, bgDivsTheme, userID, params }) {


    const [modalState, setModalState] = useState(false);

    const onClick = () => setModalState(true);

    const defaultImg = 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg';
    const defaultCover = 'https://i.pinimg.com/736x/15/e7/5d/15e75d82a96502ff9a8012a8d3cf7011.jpg';


    return (
        <section className="profile-info" style={{
            backgroundImage: `linear-gradient(to bottom, ${bgDivsTheme} 58%, ${bgTheme} 92%)`
        }}>
            <div className="profile-info__cover">
                <img src={coverImg ? coverImg : defaultCover} alt="cover" className='profile-info__cover-img' />
            </div>
            <div className="profile-info__user-info">
                <div className="profile-info__user-info-img-text">
                    <img src={img ? img : defaultImg} alt="profile image" style={{ borderColor: `${colorTheme}` }} className="profile-info__user-img" />
                    <div className="profile-info__user-text">
                        <div className="profile-info__user-text__name-section">
                            <h3 className='profile-info__name'>{name ? name : 'John'}</h3>
                            {premium && <FontAwesomeIcon icon={faCrown} color='#5D3FD3' />}
                        </div>
                        <h4 className='profile-info__username'>{username ? `@${username}` : '@JohnDoe'}</h4>
                        <h4>{biography ? biography : 'Hi im new in falaxart :D'}</h4>

                        <FollowCount
                        userProfileID={userID}
                        />
                    </div>
                </div>
                <ProfileButtons 
                userProfileID={userID}
                currentUser={currentUser}
                params={params}
                onClick={onClick} 
                />
            </div>

            <EditProfileModal
                username={username}
                img={img}
                coverImg={coverImg}
                biography={biography}
                name={name}
                modalState={modalState}
                setModalState={setModalState}
                colorTheme={colorTheme}
                bgDivsTheme={bgDivsTheme}
                gradientTheme={bgTheme}
            />
        </section>
    )
}
