import React from 'react'
import '../../../../styles/comments.css'
import { Link } from 'react-router-dom'
import { ReadMore } from '../../../../components/ReadMore'
import { getTimeAgo } from '../../../../utils/platform'

export default function Comment({userAvatar, username, comment, userID, colorTheme, createdAt}) {
  return (
    <div className='user-comment'>
        <Link to={`/profile/${userID}`}>
            <div className='user-comment__avatar-container'>
                <img 
                src={userAvatar} 
                alt={username} 
                className='user-comment__avatar' 
                style={{borderColor: colorTheme}} 
                />
            </div>
        </Link>

        <div className='user-comment__text-comment'>
            <div className="user-comment__meta">
                <Link to={`/profile/${userID}`}>
                    <span
                        className="user-comment__username"
                        style={{ color: colorTheme }}
                    >
                        {username}
                    </span>
                </Link>

                <span className="user-comment__created">
                    {getTimeAgo(createdAt)}
                </span>
            </div>

            <ReadMore comment={comment} />
        </div>
    </div>
  )
}
