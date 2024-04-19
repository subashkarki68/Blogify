export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'

const API_URL = '/api/v1'
const USERS_URL = API_URL + '/users'
const BLOGS_URL = API_URL + '/blogs'

export const URLS = {
    LOGIN: USERS_URL + '/login',
    REGISTER: USERS_URL + '/register',
    LOGOUT: USERS_URL + '/logout',
    GENERATE_FP: USERS_URL + '/generate-fp-token',
    Verify_FP: USERS_URL + '/verify-fp-token',
    Verify_Email: USERS_URL + '/verify-email',
    Change_Forgotten_Password: USERS_URL + '/change-forgotten-password',
    GET_PUBLISHED_BLOGS: BLOGS_URL + '/published-only',
    ADMIN: {
        GET_ALL_BLOGS: BLOGS_URL,
        UPDATE_BLOG_STATUS: BLOGS_URL,
        UPDATE_BLOG: BLOGS_URL,
    },
}
