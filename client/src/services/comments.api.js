import axios from "axios";
import { setAuthInterceptor } from "./setAuthInterceptor.api";

// CAMBIA ESTO
const MOBILE_DEBUG = false;

// TU IP LOCAL
const LOCAL_IP = "192.168.1.39";

// URL BASE
const BASE_URL = MOBILE_DEBUG
  ? `http://${LOCAL_IP}:8000/falaxart/api/comments/v1/`
  : "http://localhost:8000/falaxart/api/comments/v1/";

const commentsApi = axios.create({
  baseURL: BASE_URL
});

setAuthInterceptor(commentsApi);

export const createComment = (data) => {
  return commentsApi.post('create-comment/', data);
}

export const getComments = (id) => {
  return commentsApi.get(`comments-publication/${id}`);
}