import React from 'react'
import '../../../../styles/comments.css'
import { Link } from 'react-router-dom'

export default function Comment({userAvatar, username, comment, userID, colorTheme}) {
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
            <Link to={`/profile/${userID}`}>
                <span className="user-comment__username" style={{color: colorTheme}}>@{username}</span>
            </Link>
            <span className='user-comment__text'>{comment}</span>
        </div>
    </div>
  )
}
