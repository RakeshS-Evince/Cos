import axios from 'axios'
import { BASE_URL } from '../constants/constant'
export const api = axios.create({
    baseURL: BASE_URL, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
export const authApi = axios.create({
    baseURL: BASE_URL, headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})




