import React from 'react'
import useFollows from '../../../../hooks/useFollows'
import { useAuth } from '../../../../hooks/useAuth'

export default function FollowCount({userProfileID}) {

    const { user } = useAuth();
    const { fCount } = useFollows(user.id, userProfileID)

  return (
    <div className='followers-box'>
        <span className='followers-box__followers'><b>{fCount}</b> {fCount <= 1  ? 'seguidor' : 'seguidores'}</span>
    </div>
  )
}
