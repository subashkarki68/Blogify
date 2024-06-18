import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { createContext, useContext, useState } from 'react'

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
    pictureUrl?:string
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
            pictureUrl: ''
        }
    }
    const [user, setUser] = useState(initialUser())

    //TODO: add login system here

    const logout = async () => {
        const { LOGOUT } = URLS
        setUser('')
        localStorage.removeItem('userDetails')
        try {
            const response = await axiosInstance.post(LOGOUT)
            return response
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }

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
