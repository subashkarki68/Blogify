export const setAccessToken = (value: string) => {
    return localStorage.setItem('access_token', value)
}

export const getAccessToken = (key: string) => {
    return localStorage.getItem(key)
}

export const deleteAccessToken = () => {
    return localStorage.removeItem('access_token')
}

export const getAuthorizationHeader = () => {
    const token = getAccessToken('access_token')
    if (token) {
        return `Bearer ${token}`
    }
    return null
}
