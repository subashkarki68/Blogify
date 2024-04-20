export interface BlogState {
    _id: string
    author: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
    status: 'published' | 'draft'
    slug: string
    pictureUrl?: string
    timeAgo: string
}

export interface BlogsState {
    blogs: BlogState[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | undefined
    limit?: number | 10
    page?: number | 1
}
