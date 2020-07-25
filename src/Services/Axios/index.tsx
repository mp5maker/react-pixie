import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 30000,
})

export default axiosInstance