import { URLS } from '@/constants'
import { RootState } from '@/redux/store'
import { UserState, UsersState } from '@/types/userTypes'
import { axiosInstance } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: undefined,
}

const fetchUsersUrl = URLS.ADMIN.GET_ALL_USERS

//TODO: ADD other URLS```
// const updateUserIsActiveUrl = (_id: string) => URLS.ADMIN.UPDATE_USER_ISACTIVE

//

export const fetchUsers = createAsyncThunk(
    'adminUser/fetchUsers',
    async (payload: { limit: number; page: number }) => {
        let limit = payload?.limit || 10
        const response = await axiosInstance.get(
            `${fetchUsersUrl}?limit=${limit}`,
        )
        return response.data.data.data
    },
)

const userSlice = createSlice({
    name: 'adminUsers',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.users = []
            action.payload.map((user: UserState) => state.users.push(user))
            // state.users.map((user) => {
            //     user.createdAt = formatDistanceToNow(user.createdAt) + 'ago'
            // })
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
})

export const selectAllUsers = (state: RootState) => state.users.users
export const userStatus = (state:RootState) => state.users.status
export const userError = (state: RootState) => state.users.error

export const {} = userSlice.actions
export default userSlice.reducer
