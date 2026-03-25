import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("auth_token");
        }
        return Promise.reject(error);
    },
);

export const apiService = {
    // Articles
    getArticles: () => api.get("/articles"),
    getArticle: (slug: string) => api.get(`/articles/${slug}`),
    createArticle: (data: any) => api.post("/articles", data),
    updateArticle: (id: number, data: any) => api.put(`/articles/${id}`, data),
    deleteArticle: (id: number) => api.delete(`/articles/${id}`),

    // Projects
    getProjects: () => api.get("/projects"),
    getProject: (id: number) => api.get(`/projects/${id}`),
    createProject: (data: any) => api.post("/projects", data),
    updateProject: (id: number, data: any) => api.put(`/projects/${id}`, data),
    deleteProject: (id: number) => api.delete(`/projects/${id}`),

    // Comments
    getComments: (type: string, id: number) =>
        api.get(`/comments?type=${type}&id=${id}`),
    createComment: (data: any) => api.post("/comments", data),
    deleteComment: (id: number) => api.delete(`/comments/${id}`),

    // Categories
    getCategories: () => api.get("/categories"),

    // Tags
    getTags: () => api.get("/tags"),

    // Contact
    submitContact: (data: any) => api.post("/contact", data),

    // Auth
    login: (email: string, password: string) =>
        api.post("/auth/login", { email, password }),
    logout: () => api.post("/auth/logout"),
};

export default api;
