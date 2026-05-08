import React from 'react'
import useFollows from '../../../../hooks/useFollows'
import { useAuth } from '../../../../hooks/useAuth'

export default function FollowCount({userProfileID, fCount, colorCondition}) {
  return (
    <div className='followers-box'>
        <span style={colorCondition} className='followers-box__followers'><b>{fCount}</b> {fCount <= 1  ? 'seguidor' : 'seguidores'}</span>
    </div>
  )
}
