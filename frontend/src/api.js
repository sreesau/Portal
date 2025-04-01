import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000", // Ensure this matches Django server
    headers: { "Content-Type": "application/json" },
});

// Automatically set the token for every request
const token = localStorage.getItem("token");
if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`; // Correct format for DRF
}

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
    } else {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
    }
};
