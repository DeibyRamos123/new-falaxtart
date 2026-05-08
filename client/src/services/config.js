const MOBILE_DEBUG = false;

const LOCAL_IP = "192.168.1.39";

export const BACKEND_URL = MOBILE_DEBUG
  ? `http://${LOCAL_IP}:8000`
  : "http://127.0.0.1:8000";