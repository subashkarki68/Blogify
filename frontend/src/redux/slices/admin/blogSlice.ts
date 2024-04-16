import { URLS } from '@/constants'
import { RootState } from '@/redux/store'
import { axiosInstance } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface BlogState {
    _id: string
    author: string
    title: string
    content: string
    createdAt: string
    status: 'published' | 'draft'
    slug: string
    pictureUrl?: string
}

export interface BlogsState {
    blogs: BlogState[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | undefined
}

const initialState: BlogsState = {
    blogs: [],
    status: 'idle',
    error: undefined,
}

const fetchBlogsUrl = URLS.ADMIN.GET_ALL_BLOGS
const updateBlogStatusUrl = (slug: string) =>
    URLS.ADMIN.UPDATE_BLOG_STATUS + `/${slug}`

export const fetchBlogs = createAsyncThunk('adminBlog/fetchBlogs', async () => {
    const response = await axiosInstance.get(fetchBlogsUrl + '?limit=100')
    return response.data.data.data
})

export const updateBlogStatus = createAsyncThunk(
    'adminBlog/updateBlogStatus',
    async (params: { slug: string; blogStatus: 'published' | 'draft' }) => {
        const response = await axiosInstance.patch(
            updateBlogStatusUrl(params.slug),
            { status: params.blogStatus },
            { withCredentials: true },
        )
        return response.data.data
    },
)

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
        })
        builder.addCase(fetchBlogs.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        builder.addCase(updateBlogStatus.fulfilled, (state, action) => {
            state.status = 'succeeded'
            const result = state.blogs.find(
                (blog) => blog._id === action.payload._id,
            )
            if (result) result.status = action.payload.status

            console.log('🚀 ~ builder.addCase ~ index:', result?.status)
        })
        builder.addCase(updateBlogStatus.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
})

export const selectAllBlogs = (state: RootState) => state.blogs.blogs
export const blogsStatus = (state: RootState) => state.blogs.status
export const blogsError = (state: RootState) => state.blogs.error

export const {} = blogSlice.actions
export default blogSlice.reducer
