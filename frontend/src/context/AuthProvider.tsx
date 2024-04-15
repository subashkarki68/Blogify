import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthProviderProps {
    children: React.ReactNode
}

export interface User {
    userId: string
    name: string
    email: string
    roles: string[]
    fName?: string
    lName?: string
}

interface AuthContextType {
    user: User
    setUser: (user: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
    const userLS = localStorage.getItem('userDetails')

    const initialUser = () => {
        if (userLS !== null) return JSON.parse(userLS)
        return {
            userId: '',
            name: '',
            email: '',
            roles: [''],
            fName: '',
            lName: '',
        }
    }
    const [user, setUser] = useState(initialUser())

    //TODO: add login system here

    const logout = async () => {
        const { LOGOUT } = URLS
        setUser(initialUser)
        localStorage.removeItem('userDetails')
        try {
            await axiosInstance.post(LOGOUT)
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }
    useEffect(() => {
        localStorage.setItem('userDetails', JSON.stringify(user))
    }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    if (context === undefined)
        throw new Error('useAuthContext must be used within a AuthContext')
    return context
}

export default AuthProvider
