import React from 'react'
import { Link } from 'react-router-dom'

export function PublicationUserInformation({ userAvatar, publicationUser }) {

    return (
        <div className="publication-user__temp">
            <div className="publication-user-section__avatar__temp" style={{ borderColor: `${publicationUser.color_theme}` }} >
                <Link to={`/profile/${publicationUser.id}`}>
                    <img
                        src={userAvatar}
                        alt={publicationUser.username}
                        className="user__avatar__temp"
                    />
                </Link>
            </div>
            <div className="publication-user__names__temp">
                <p className="user-first-name__temp">{publicationUser.first_name}</p>
                <p className="user-username__temp">{`@${publicationUser.username}`}</p>
            </div>
        </div>
    )
}
