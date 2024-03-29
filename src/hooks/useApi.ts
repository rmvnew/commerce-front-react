

import axios from 'axios'

const apiUrl = process.env.REACT_APP_API;
const token = localStorage.getItem('authToken')


export const api = axios.create({
    baseURL: apiUrl
})


api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken')
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});




export const useApi = () => ({
    validateToken: async () => {

        try {
            const token = localStorage.getItem('authToken')


            const response = await api.post('/auth/validate', { token }, { headers: { Authorization: `Bearer ${token}` } })
            return response
        } catch (error) {
            console.log('Token validation failed:', error)
            return null
        }

    },
    signin: async (login: string, password: string) => {

        try {

            const response = await api.post('/auth/login', { login, password })

            return response.data

        } catch (error: any) {
            if (error.response) {
                return {
                    message: error.response.data.error,
                    code: error.response.status,
                    status: false
                }
            } else {
                console.error('Error without response', error);
                return {
                    message: error.message,
                    code: 0,
                    status: false
                }
            }
        }

    },
    logout: async () => {

        try {
            const token = localStorage.getItem('authToken')
            const response = await api.post('/auth/logout', { token }, { headers: { Authorization: `Bearer ${token}` } })
            localStorage.removeItem('authToken')
        } catch (error) {
            console.log('Error in logout: ', error);
        }

    }
})