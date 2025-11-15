import axios from "axios";
import { setAuthInterceptor } from "./setAuthInterceptor.api";

const commentsApi= axios.create({
    baseURL: 'http://localhost:8000/falaxart/api/comments/v1/'
})

setAuthInterceptor(commentsApi);

export const createComment = (data) => {
    return commentsApi.post('create-comment/', data);
}

export const getComments = (id) => {
    return commentsApi.get(`comments-publication/${id}`);
}