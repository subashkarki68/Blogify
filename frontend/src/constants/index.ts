export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000'

const API_URL = '/api/v1'
export const USERS_URL = API_URL + '/users'
export const BLOGS_URL = API_URL + '/blogs'

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
        DELETE_BLOG: BLOGS_URL,
        ADD_BLOG: BLOGS_URL,
        GET_ALL_USERS: USERS_URL,
        UPDATE_USER_EMAIL_VERIFICATION: USERS_URL + '/verify-user-email',
        UPDATE_IS_ACTIVE: USERS_URL + '/block-user',
        UPDATE_USER: USERS_URL + '/update-by-admin',
        DELETE_USER: USERS_URL,
        ADD_USER: USERS_URL,
        RESET_PASSWORD: USERS_URL + '/reset-password',
    },
}
