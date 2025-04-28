import React from 'react'
import './css/ModalForm.css'

export function ModalForm({children, estadoModal, cambiarEstado, title}) {

  const cerrar = () => cambiarEstado(false);

  return (
    <>
        <div className={`overlay ${estadoModal ? 'overlay--active' : ''}`}>
            <div className={`modal-container ${estadoModal? 'modal-container--active' : ''}`}>
                <div className="modal-header">
                     <h3 className='modal-header__title'>{ title }</h3>
                </div>
                <button className='close-modal' onClick={cerrar}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
                </button>
                {children}
            </div>
        </div>
    </>
  );
}

