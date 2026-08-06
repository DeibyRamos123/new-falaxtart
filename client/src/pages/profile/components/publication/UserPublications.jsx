// Tarjeta de plucación de perfil de usuario

import React from 'react'
import '../../../../styles/UserPublications.css'
import { Link } from "react-router-dom";
import { useAuth } from '../../../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaystation, faXbox, faSteam } from '@fortawesome/free-brands-svg-icons'
import { faGamepad, faMobileScreen } from '@fortawesome/free-solid-svg-icons'
import { getPlatformColor, getPlatformIcon } from '../../../../utils/platform.js'

export function UserPublications({avatar, title, content, platform, tag, username,colorTheme}) {
  
  return (
    <div className="publication">
          <div className="publication__body">
              <img src={content} alt={title} className='publication-home__body__content'/>
          </div>
        <div className="publication__footer">
            <div className="user-information">
                <div className='publication__footer-text-context'>
                  <div className='publication-home__footer__tags'>
                    <img src={avatar} alt={username} className='user-information__img' style={{ borderColor: `${colorTheme}` }}/>
                    <p className={`publication-home__footer__tags--plat ${getPlatformColor(platform)}`}>
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
