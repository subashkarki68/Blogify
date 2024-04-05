import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext } from 'react'

export interface Blog {
    title: string
    content: string
}

interface BlogContextType {
    data: { data: Blog[] }
    isPending: boolean
    error: Error | null
    isFetched: boolean
}
const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogContextProvider({ children }: { children: ReactNode }) {
    const { GET_ALL_BLOGS } = URLS.ADMIN
    const { data, isPending, error, isFetched } = useQuery({
        queryKey: ['blogs'],
        queryFn: () =>
            axiosInstance
                .get(GET_ALL_BLOGS + '?page=1&limit=10')
                .then((res) => res.data.data),
    })
    return (
        <BlogContext.Provider
            value={{ data, isPending, error, isFetched } as BlogContextType}
        >
            {children}
        </BlogContext.Provider>
    )
}

export function useBlogContext() {
    const blogs = useContext(BlogContext)
    if (blogs === undefined)
        throw new Error('useBlogContext must be used with a BlogContext')
    return blogs
}
