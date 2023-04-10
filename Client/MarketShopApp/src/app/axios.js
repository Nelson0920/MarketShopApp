import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {'Accept': 'application/json'}
})
export const instance2 = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {'Accept': 'application/json'}
})
