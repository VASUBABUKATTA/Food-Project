import axios from 'axios';
// import io from "socket.io-client";
// export const socket = io("http://localhost:9090");

// const API_BASE_URL = "http://192.168.1.6:9090";
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const CategoryService =
{
    post: (endpoint, data, config = {}) => {
        console.log(data);
        return axios.post(`${API_BASE_URL}${endpoint}`, data, config);
    },

    get: (endpoint, config = {}) => {
        return axios.get(`${API_BASE_URL}${endpoint}`, config);
    },

    put: (endpoint, data, config = {}) => {
        return axios.put(`${API_BASE_URL}${endpoint}`, data, config);
    },

    delete: (endpoint, config = {}) => {
        return axios.delete(`${API_BASE_URL}${endpoint}`, config);
    },

     fetchAllDetailsByCounterID(id)
    {
        return axios.delete(`${API_BASE_URL}/getCategory/ByCounterId/${id}`);
    },

    fetchAllCategoryDetailsByCounterId(id)
    {
        return axios.get(`${API_BASE_URL}/menuItem/getcategorysById/${id}`);
    }

}
export default CategoryService;