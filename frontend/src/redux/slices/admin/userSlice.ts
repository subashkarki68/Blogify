import { URLS, USERS_URL } from '@/constants'
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
const updateEmailVerificationUrl = URLS.ADMIN.UPDATE_USER_EMAIL_VERIFICATION
const updateIsActiveUrl = URLS.ADMIN.UPDATE_IS_ACTIVE
const updateUserUrl = URLS.ADMIN.UPDATE_USER
const resetPasswordUrl = URLS.ADMIN.RESET_PASSWORD
const addUserUrl = USERS_URL

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

export const updateEmailVerified = createAsyncThunk(
    'adminUser/updateEmailVerified',
    async(payload:{email:string,emailVerified:boolean})=>{
        const response = await axiosInstance.patch(updateEmailVerificationUrl,{email:payload.email, status:payload.emailVerified})
        return response.data // Only return the serializable part
    }
)
export const updateIsActive = createAsyncThunk(
    'adminUser/updateIsActive',
    async(payload:{email:string,isActive:boolean})=>{
       const response = await axiosInstance.patch(updateIsActiveUrl,{email:payload.email})
       return response.data // Only return the serializable part
    }
)

export const updateUser = createAsyncThunk(
    'adminUser/updateUser',
    async(payload:{_id:string,rest:any})=>{
        // return await axiosInstance.patch(updateUserUrl,{_id:payload._id, ...payload.rest})
        const result = await axiosInstance.patch(updateUserUrl,{_id:payload._id, ...payload.rest})
        return result.data.data
    }
)

export const resetPassword = createAsyncThunk(
    'adminUser/resetPassword',
    async(payload:{email:string,newPassword:string})=>{
        const result = await axiosInstance.post(resetPasswordUrl,{email:payload.email,newPassword:payload.newPassword})
        return result.data // Only return the serializable part
    }
)

export const addUser = createAsyncThunk(
    'adminUSer/addUser',
    async(payload)=>{
        const result = await axiosInstance.post(addUserUrl,payload)
        console.log("Add NEW USer",result)
        return result
    }
)

const userSlice = createSlice({
    name: 'adminUsers',
    initialState,
    reducers: {
        resetUserState: () => {
            return initialState;
        },
    },
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

export const {resetUserState} = userSlice.actions
export default userSlice.reducer
