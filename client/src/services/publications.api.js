import axios from "axios";
import { setAuthInterceptor } from './setAuthInterceptor.api';

const publicationsApi= axios.create({
    baseURL: 'http://localhost:8000/falaxart/api/publications/v1/'
})

setAuthInterceptor(publicationsApi);

export const uploadPublication = (datos) => {
    return publicationsApi.post("create-publication/", datos);
}

export const loadUserPublications = (id) => {
    return publicationsApi.get(`user-publications/${id}`);
}


export const ObtainPublication = (id) => {
    return publicationsApi.get(`publication-obtain/${id}`);
}

export const ObtainPublications = () => {
    return publicationsApi.get(`publications/`)
}

