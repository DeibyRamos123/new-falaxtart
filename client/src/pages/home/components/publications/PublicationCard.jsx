import React from 'react'
import '../../../../styles/PublicationCard.css';
import { Link} from "react-router-dom";

export function PublicationCard({title, avatar, content, username, usuarioId, publicationId}) {
  return (
    <Link to={`/update-publication/${publicationId}`} className='publication-link'>
    <div className="publication-home">
          <div className="publication-home__body">
              <img src={content} alt={title} className='publication-home__body__content'/>
          </div>
        
        <div className="publication-home__footer">
            <div className="user-information">
                <Link to={`/profile/${usuarioId}`}>
                  <img src={avatar} alt={username} className='user-information__img' />
                </Link>
                <p className="publication-home__footer__title">{title}</p>
            </div>
        </div>
    </div>
    </Link>
  )
}

