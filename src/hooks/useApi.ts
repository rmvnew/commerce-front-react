

import axios from 'axios'

const apiUrl = process.env.REACT_APP_API;
const token = localStorage.getItem('authToken')


export const api = axios.create({
    baseURL: apiUrl,
    headers: { Authorization: `Bearer ${token}` }
})


export const useApi = () => ({
    validateToken: async () => {
        const response = await api.post('/auth/validate', { token })
        return response
    },
    signin: async (email: string, password: string) => {
        const response = await api.post('/login', { email, password })
        return response.data
    },
    logout: async () => {
        // const response = await api.post('/logout')
        // return response.data
    }
})