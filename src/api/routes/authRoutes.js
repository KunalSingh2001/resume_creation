import api from "../axios";
const Auth_API = {
    login: (data) => api.post("/auth/login", data),
    getCurrentUser: () => api.get("/auth/current-user"),
    logoutUser: () => api.get("/auth/logout"),
}

export default Auth_API