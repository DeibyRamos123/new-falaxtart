import React from 'react'
import '../styles/UserPublications.css'
export function UserPublications({avatar, title, content}) {
  return (
    <div className="publication">
        <div className="publication__body">
            <img src={content} alt="" className="publication__body__image" />
        </div>
        <div className="publication__footer">
            <img src={avatar} alt="" className="publication-user__image" />
            <h3 className="publication__footer__title">{title}</h3>
        </div>
    </div>
  )
}
