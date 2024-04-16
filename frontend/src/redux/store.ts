import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './slices/admin/blogSlice'

export const store = configureStore({
    reducer: {
        blogs: blogReducer,
    },
    devTools: false,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
