import { useEffect, useState } from "react";
import { UsuarioCard } from "./UsuarioCard";


export function UsuarioList() {
  const [usuarios,setUsuario] = useState([]);
  
  // useEffect(()=>{
  //   async function loadTask (){
  //     const res = await getAllUsuarios()
  //     setUsuario(res.data);
  //   }
  //   loadTask()
  // }, [])
  return (
    <div>
      {usuarios.map(usuario => (
        <UsuarioCard key={usuario.id} usuario={usuario}/>
      ))}
    </div>
  )
}