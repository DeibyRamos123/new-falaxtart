import axios from "axios"
import { setAuthInterceptor } from "./setAuthInterceptor.api"

const followApi =  axios.create({
    baseURL: 'http://localhost:8000/falaxart/api/follows/v1/'
})

setAuthInterceptor(followApi);

export const follow = (data) => {
    return followApi.post('follow/', data);
}

export const getFollowers = (id) => followApi.get(`followers/${id}/`);


export const removeFollow = (data) => followApi.delete(`remove-follower/${data.follower}/${data.following}/`);

export const checkFollowStatus = (followerId, followingId) => followApi.get(`follow/status/${followerId}/${followingId}/`);