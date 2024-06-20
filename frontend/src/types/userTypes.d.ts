export interface UserState {
    _id: string
    name: string
    email: string
    password: string
    roles: 'admin' | 'user'
    pictureUrl: string
    isActive: boolean
    emailVerified: boolean
    createdAt: string
}

export interface UsersState {
    users: UsersState[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | undefined
}
