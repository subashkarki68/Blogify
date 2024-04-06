import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
const { LOGOUT } = URLS

export const Logout = async () => {
    localStorage.removeItem('userDetails')
    try {
        return await axiosInstance.post(LOGOUT)
    } catch (error) {
        console.error('Error during logout:', error)
    }
}
