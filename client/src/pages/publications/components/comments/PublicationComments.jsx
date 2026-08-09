import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../../../hooks/useAuth'
import '../../../../styles/comments.css'
import useComments from '../../../../hooks/useComments';
import Comment from './Comment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import CommentsToggle from './CommentsToggle'

export default function PublicationComments({ user_avatar, publicationUser }) {

    const { user } = useAuth();

    const curUserAvatar = `http://localhost:8000/${user.avatar}`;

    const params = useParams();

    const {register, comment, loadingComment, onSubmitComment} = useComments(params);

    const [visibleComments, setVisibleComments] = useState(6); // definimos un estado para limitar los comentarios a 7

    // const userCommentAvatar = ;


    return (
            <section className="publication-info-section">
                <div className="publication-user">
                    <div className="publication-user-section__avatar" style={{ borderColor: `${publicationUser.color_theme}` }} >
                        <Link to={`/profile/${publicationUser.id}`}>
                            <img 
                            src={user_avatar} 
                            alt={publicationUser.username} 
                            className="user__avatar" 
                            />
                        </Link>
                    </div>
                    <div className="publication-user__names">
                        <p className="user-first-name">{publicationUser.first_name}</p>
                        <p className="user-username">{`@${publicationUser.username}`}</p>
                    </div>
                </div>

                <section className='publication-comments-section'>
                    <form className='publication-comment-box' onSubmit={onSubmitComment}>
                        <div 
                        className="publication-user-section__avatar publication-user-section__avatar--small" 
                        style={{ borderColor: `${user.color_theme}` }}
                        >
                            <img src={curUserAvatar} alt={user.username} className="user__avatar" />
                        </div>

                        <input 
                        type="text" 
                        className='publication-comment-box__input' 
                        placeholder='Write a comment...'
                        {...register('contenido')}
                        />
                        <button className='publication-comment-box__btn'>send</button>
                    </form>
                    
                    <section className='publication-user-comments'>
                        <p className='comments-count'>{comment.length > 0 ? `${comment.length} comments` : 'there is no comments yet'}</p>
                        {comment && comment.slice(0, visibleComments).map(comentario => (
                            comentario?.usuario && (
                                <Comment 
                                    key={comentario.id}
                                    userAvatar={`http://localhost:8000/${comentario.usuario.avatar}`}
                                    username={comentario.usuario.first_name}
                                    comment={comentario.contenido}
                                    colorTheme={comentario.usuario.color_theme}
                                    userID={comentario.usuario.id}
                                    createdAt={comentario.created_at}
                                />
                            )
                        ))}


                        {/* boton para ver todos los comentarios */}

                        { comment.length > 6 && ( // si la longitud del array de comentarios es mayor a 6 mostramos el boton

                            <CommentsToggle
                                expanded={visibleComments >= comment.length}
                                onToggle={() => {
                                    if (visibleComments >= comment.length) { // si los comentarios son iguales o mayores a longitud del array los limitamos a 6
                                        setVisibleComments(6);
                                    } else { // si no ponemos visibles todos los comentarios igualando la limitacion a la longitud del array
                                        setVisibleComments(comment.length);
                                    }
                                }}
                            />
                        )
                        }
                    </section>
                </section>
            </section>
  )
}
