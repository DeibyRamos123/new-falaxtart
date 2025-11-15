import React from 'react'
import '../../../../styles/PublicationCard.css';
import { Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaystation, faXbox, faSteam } from '@fortawesome/free-brands-svg-icons'
import { faGamepad, faMobileScreen } from '@fortawesome/free-solid-svg-icons'

export function PublicationCard({title, avatar, content, username, usuarioId, publicationId, tag, platform, colorTheme}) {

  const navigate = useNavigate();

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'playstation':
        return faPlaystation
      case 'xbox':
        return faXbox
      case 'nintendo':
        return faGamepad
      case 'pc':
        return faSteam
      case 'mobile':
        return faMobileScreen
      default:
        return null
    }
  }
  return (
 <div className='publication-link' onClick={() => navigate(`/update-publication/${publicationId}`)}>
  <div className="publication-home">
    <div className="publication-home__body">
      <img src={content} alt={title} className='publication-home__body__content'/>
    </div>
    
    <div className="publication-home__footer">
      <div className="user-information">
        <Link to={`/profile/${usuarioId}`}>
          <img src={avatar} alt={username} className='user-information__img' style={{ borderColor: `${colorTheme}` }} />
        </Link>
        <div className='publication-home__footer-text-context'>
          <div className='publication-home__footer__tags'>
            <p className={`publication-home__footer__tags-plat ${
              platform === 'playstation'
                ? 'bg-blue'
                : platform === 'xbox'
                ? 'bg-green'
                : platform === 'nintendo'
                ? 'bg-red'
                : platform === 'pc'
                ? 'bg-purple'
                : platform === 'mobile'
                ? 'bg-orange'
                : ''
            }`}>
              <FontAwesomeIcon icon={getPlatformIcon(platform)} style={{ marginRight: 2 }} />
              {platform}
            </p>
            <p className='publication-home__footer__tags-cat'>{tag}</p>
          </div>
          <p className="publication-home__footer__title">{title}</p>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

