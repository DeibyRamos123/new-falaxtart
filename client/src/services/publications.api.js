import axios from "axios";
import { setAuthInterceptor } from './setAuthInterceptor.api';

// CAMBIA ESTO
const MOBILE_DEBUG = false;

// TU IP LOCAL
const LOCAL_IP = "192.168.1.39";

// URL BASE
const BASE_URL = MOBILE_DEBUG
  ? `http://${LOCAL_IP}:8000/falaxart/api/publications/v1/`
  : "http://localhost:8000/falaxart/api/publications/v1/";

const publicationsApi = axios.create({
    baseURL: BASE_URL
});

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
    return publicationsApi.get(`publications/`);
}
