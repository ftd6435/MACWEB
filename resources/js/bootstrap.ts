import axios from "axios";

declare global {
    interface Window {
        axios: typeof axios;
    }
}

export {};

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Set the API base URL
window.axios.defaults.baseURL =
    import.meta.env.VITE_API_URL || "http://localhost:8000/api";
