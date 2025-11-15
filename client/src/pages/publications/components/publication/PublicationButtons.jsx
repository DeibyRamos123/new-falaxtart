import React from 'react'

export default function PublicationButtons({ isDifferentUser }) {
  return (
    <div>
      {isDifferentUser ? (
        ""
      ) : (
        <button className="profile-info__user-edit-profile-btn">
          Editar publicacion
        </button>
      )}
    </div>
  );
}

