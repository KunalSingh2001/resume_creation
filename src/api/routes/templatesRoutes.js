import api from "../axios";
const TEMPLETS_API = {
    getAllTemplates: () => api.get("/templates"),
    getAllCategories: () => api.get("/templates/categories"),
    createResume: (data) => api.post("/resume/create", data),
    saveResume: (data) => api.post("/resume/save", data),
    getResume: () => api.get("/resume/get"),
    downloadResume: () => api.get("/resume/download"),
    storeActivity: (slug) => api.post("/resume/store-activity", slug),
}

export default TEMPLETS_API