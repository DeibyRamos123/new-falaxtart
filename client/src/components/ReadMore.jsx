import { text } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

export function ReadMore ({comment}){
    const [expanded, setExpanded] = useState(false); // se pone use state y dentro de las parentesis el valor inicial

    const limit = 41; // se pone un limite de caracteres

    const displayText = expanded ? comment : comment.slice(0, limit) + (comment.length > limit ? "..." : ""); 
    // validacion 1: si el comentario exede el limite coloca ..., validacion 2: si el expandido esta en falso corta del 0 al 43 y devulve esa cadena 

    return (
        <div className="user-comment__text-comment__button-section">
            <p className="user-comment__text-comment__button-section__text">
                {displayText}
            </p>

            {comment.length > limit &&   // validacion si el texto es superior al limite "si el comentario tiene mas de 100 caracteres"
            (
                <button onClick={() => setExpanded(!expanded)} className="user-comment__text-comment__button-section__text__button"> 
                    {expanded ? 'Read less' : 'Read more'}
                </button>
            )}
        </div>
    )
}