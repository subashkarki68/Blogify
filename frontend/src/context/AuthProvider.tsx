import { createContext, useContext, useEffect, useState } from 'react'

interface AuthProviderProps {
    children: React.ReactNode
}

export interface User {
    name: string
    email: string
    roles: string[]
    fName?: string
    lName?: string
}

interface AuthContextType {
    user: User
    setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
    const userLS = localStorage.getItem('userDetails')
    const initialUser = () => {
        if (userLS !== null) return JSON.parse(userLS)
        return {
            name: '',
            email: '',
            roles: [''],
            fName: '',
            lName: '',
        }
    }
    const [user, setUser] = useState(initialUser())
    useEffect(() => {
        localStorage.setItem('userDetails', JSON.stringify(user))
    }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
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
