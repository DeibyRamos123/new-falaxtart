import { useNavigate } from "react-router-dom";

export function UsuarioCard({usuario}) {
    const navigate = useNavigate();
  
    const clickEvent = () => {
      navigate(`/usuario/${usuario.id}`);
    }
  return (
    <div onClick={clickEvent}>
        <h1>{usuario.first_name}</h1>
        <p>{usuario.username}</p>
    </div>
  )
}

