

import axios from 'axios'

const apiUrl = process.env.REACT_APP_API;
const token = localStorage.getItem('authToken')


export const api = axios.create({
    baseURL: apiUrl,
    headers: { Authorization: `Bearer ${token}` }
})




export const useApi = () => ({
    validateToken: async () => {
        const token = localStorage.getItem('authToken')

        console.log('token: ',token);

        const response = await api.post('/auth/validate', {token}, { headers: { Authorization: `Bearer ${token}` } })
        return response
    },
    signin: async (login: string, password: string) => {
        
        const response = await api.post('/auth/login', { login, password })

        return response.data
    },
    logout: async () => {
        const token = localStorage.getItem('authToken')
        // const response = await api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } })
        // return response.data
    }
})