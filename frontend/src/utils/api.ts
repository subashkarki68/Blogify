import { BASE_URL } from '@/constants'
import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { access_token: 'foobar' },
})
