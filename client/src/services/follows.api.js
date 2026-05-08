import axios from "axios";
import { setAuthInterceptor } from "./setAuthInterceptor.api";

// CAMBIA ESTO
const MOBILE_DEBUG = false;

// TU IP LOCAL
const LOCAL_IP = "192.168.1.39";

// URL BASE
const BASE_URL = MOBILE_DEBUG
  ? `http://${LOCAL_IP}:8000/falaxart/api/follows/v1/`
  : "http://localhost:8000/falaxart/api/follows/v1/";

const followApi = axios.create({
  baseURL: BASE_URL
});

setAuthInterceptor(followApi);

export const follow = (data) => {
  return followApi.post('follow/', data);
}

export const getFollowers = (id) =>
  followApi.get(`followers/${id}/`);

export const removeFollow = (data) =>
  followApi.delete(
    `remove-follower/${data.follower}/${data.following}/`
  );

export const checkFollowStatus = (followerId, followingId) =>
  followApi.get(
    `follow/status/${followerId}/${followingId}/`
  );