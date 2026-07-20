import api from "../axios";
const Auth_API = {
    login: (data) => api.post("/auth/login", data),
}

export default Auth_API