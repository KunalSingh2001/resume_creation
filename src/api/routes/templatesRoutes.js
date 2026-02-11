import api from "../axios";
const TEMPLETS_API = {
    getAllTemplates: () => api.get("/templates"),
    getAllCategories: () => api.get("/templates/categories"),
}

export default TEMPLETS_API

