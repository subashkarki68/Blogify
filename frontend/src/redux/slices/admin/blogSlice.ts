import { URLS } from '@/constants'
import { RootState } from '@/redux/store'
import { BlogsState, BlogState } from '@/types/blogTypes'
import { axiosInstance } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatDistanceToNow } from 'date-fns'

const initialState: BlogsState = {
    blogs: [],
    status: 'idle',
    error: undefined,
}

const fetchBlogsUrl = URLS.ADMIN.GET_ALL_BLOGS
const updateBlogStatusUrl = (slug: string) =>
    URLS.ADMIN.UPDATE_BLOG_STATUS + `/${slug}`
const updateBlogUrl = (slug: string) => URLS.ADMIN.UPDATE_BLOG + `/${slug}`
const deleteBlogUrl = (slug: string) => URLS.ADMIN.DELETE_BLOG + `/${slug}`
const addBlogUrl = URLS.ADMIN.ADD_BLOG

export const fetchBlogs = createAsyncThunk(
    'adminBlog/fetchBlogs',
    async (payload: { limit: number; page: number }) => {
        let limit = payload?.limit || 10
        const response = await axiosInstance.get(
            `${fetchBlogsUrl}?limit=${limit}`,
        )
        return response.data.data.data
    },
)

export const updateBlogStatus = createAsyncThunk(
    'adminBlog/updateBlogStatus',
    async (params: { slug: string; blogStatus: 'published' | 'draft' }) => {
        const response = await axiosInstance.patch(
            updateBlogStatusUrl(params.slug),
            { status: params.blogStatus },
        )
        return response.data.data
    },
)

export const updateBlog = createAsyncThunk(
    'adminBlog/updateBlog',
    async (params: { slug: string; payload: any }) => {
        const response = await axiosInstance.put(updateBlogUrl(params.slug), {
            title: params.payload?.title || '',
            content: params.payload?.content || '',
        })
        return response.data.data
    },
)

export const deleteBlog = createAsyncThunk(
    'adminBlog/deleteBlog',
    async (slug: string) => {
        const response = await axiosInstance.delete(deleteBlogUrl(slug))
        return response.data
    },
)

export const addNewBlog = createAsyncThunk(
    'adminBlog/addBlog',
    async (payload: BlogState) => {
        const response = await axiosInstance.post(addBlogUrl, {
            title: payload.title,
            content: payload.content,
        })
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
            state.blogs = []
            action.payload.map((blog: BlogState) => state.blogs.push(blog))
            state.blogs.map((blog) => {
                blog.timeAgo = formatDistanceToNow(blog.updatedAt) + ' ago'
            })
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
            if (result) {
                result.status = action.payload.status
                result.timeAgo = formatDistanceToNow(new Date()) + ' ago'
            }
        })
        builder.addCase(updateBlogStatus.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        builder.addCase(updateBlog.fulfilled, (state, action) => {
            const result = state.blogs.find(
                (blog) => blog._id === action.payload._id,
            )
            if (result) {
                result.title = action.payload.title
                result.content = action.payload.content
                result.slug = action.payload.slug
                result.timeAgo = formatDistanceToNow(new Date()) + ' ago'
            }
        })
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            state.blogs = state.blogs.filter(
                (blog) => blog.slug !== action.meta.arg,
            )
        })
        builder.addCase(addNewBlog.fulfilled, (state, action) => {
            action.payload.timeAgo = formatDistanceToNow(new Date()) + ' ago'
            action.payload.author = 'You'
            action.payload.status = 'draft'
            state.blogs.unshift(action.payload)
            console.log(action.payload)
        })
    },
})

export const selectAllBlogs = (state: RootState) => state.blogs.blogs
export const blogsStatus = (state: RootState) => state.blogs.status
export const blogsError = (state: RootState) => state.blogs.error

export const {} = blogSlice.actions
export default blogSlice.reducer
