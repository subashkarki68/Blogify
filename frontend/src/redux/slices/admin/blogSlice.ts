import { BASE_URL, URLS } from '@/constants'
import { RootState } from '@/redux/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface BlogState {
    title: string
    content: string
}

export interface BlogsState {
    blogs: BlogState[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: BlogsState = {
    blogs: [],
    status: 'idle',
    error: null,
}

const fetchBlogsUrl = BASE_URL + URLS.ADMIN.GET_ALL_BLOGS

export const fetchBlogs = createAsyncThunk('adminBlog/fetchBlogs', async () => {
    const response = await axios.get(fetchBlogsUrl)
    // console.log(response.data.data.data)
    return response.data.data.data
})

const blogSlice = createSlice({
    name: 'adminBlogs',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchBlogs.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.status = 'succeeded'
            action.payload.map((blog: BlogState) => state.blogs.push(blog))
            // console.log('state', state.blogs)
        })
        builder.addCase(fetchBlogs.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export const selectAllBlogs = (state: RootState) => state.blogs.blogs
export const blogsStatus = (state: RootState) => state.blogs.status
export const blogsError = (state: RootState) => state.blogs.error

export const {} = blogSlice.actions
export default blogSlice.reducer
