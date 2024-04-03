export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'

const API_URL = '/api/v1'
const USERS_URL = API_URL + '/users'

export const URLS = {
    LOGIN: USERS_URL + '/login',
    REGISTER: USERS_URL + '/register',
    GENERATE_FP: USERS_URL + '/generate-fp-token',
    Verify_FP: USERS_URL + '/verify-fp-token',
    Verify_Email: USERS_URL + '/verify-email',
    Change_Forgotten_Password: USERS_URL + '/change-forgotten-password',
}
