import axios from 'axios'


const usuariosApi = axios.create({
    baseURL: 'http://localhost:8000/falaxart/api/users/v1/'
})

usuariosApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
})



export const getUsuario = (id) => usuariosApi.get(`/${id}/`)

export const createUsuario = (usuario) => {
    return usuariosApi.post('register/', usuario);
}

export const loginUsuario = (user) => {
    return usuariosApi.post('login/', user);
}


export const updateUsuario = (id, usuario) => {
    usuariosApi.put(`/${id}/`, usuario);
}

export const homeUsuario = () => {
    return usuariosApi.get('me/');
}

export const profileUsuario = (id) =>{
    return usuariosApi.get(`profile/${id}`);
}

export const updateUserInfo = async (datos, token) => {
    return usuariosApi.put("update/", datos, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

