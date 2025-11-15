import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../../../hooks/useAuth'
import '../../../../styles/comments.css'
import useComments from '../../../../hooks/useComments';
import Comment from './Comment';

export default function PublicationComments({ user_avatar, publicationUser }) {

    const { user } = useAuth();

    const curUserAvatar = `http://localhost:8000/${user.avatar}`;

    const params = useParams();

    const {register, comment, loadingComment, onSubmitComment} = useComments(params);

    // const userCommentAvatar = ;
    console.log(comment);


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
                        placeholder='Enter text here'
                        {...register('contenido')}
                        />
                        <button className='publication-comment-box__btn'>send</button>
                    </form>

                    <section className='publication-user-comments'>
                        {comment && comment.map(comentario => (
                            comentario?.usuario && (
                                <Comment 
                                    key={comentario.id}
                                    userAvatar={`http://localhost:8000/${comentario.usuario.avatar}`}
                                    username={comentario.usuario.username}
                                    comment={comentario.contenido}
                                    colorTheme={comentario.usuario.color_theme}
                                    userID={comentario.usuario.id}
                                />
                            )
                        ))}
                    </section>
                </section>
            </section>
  )
}
