import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './slices/admin/blogSlice'
import userReducer from './slices/admin/userSlice'

export const store = configureStore({
    reducer: {
        blogs: blogReducer,
        users: userReducer,
    },
    devTools: !import.meta.env.PROD,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
