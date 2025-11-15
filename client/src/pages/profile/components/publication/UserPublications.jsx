import React from 'react'
import '../../../../styles/UserPublications.css'
import { Link } from "react-router-dom";
import { useAuth } from '../../../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaystation, faXbox, faSteam } from '@fortawesome/free-brands-svg-icons'
import { faGamepad, faMobileScreen } from '@fortawesome/free-solid-svg-icons'
export function UserPublications({avatar, title, content, platform, tag, username,colorTheme}) {
  
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
    <div className="publication">
          <div className="publication__body">
              <img src={content} alt={title} className='publication-home__body__content'/>
          </div>
        
        <div className="publication__footer">
            <div className="user-information">
                  <img src={avatar} alt={username} className='user-information__img' style={{ borderColor: `${colorTheme}` }}/>
                <div className='publication__footer-text-context'>
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
  )
}
