import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
const { LOGOUT } = URLS

export const Logout = async () => {
    localStorage.removeItem('userDetails')
    try {
        const response = await axiosInstance.post(LOGOUT)
        return response
    } catch (error) {
        console.error('Error during logout:', error)
    }
}
