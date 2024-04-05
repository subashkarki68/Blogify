import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { createContext } from 'react'

const BlogContext = createContext(null)

function BlogContextProvider({ children }: { children: any }) {
    const { GET_ALL_BLOGS } = URLS.ADMIN
    const { data: blogs } = useQuery({
        queryKey: ['blogs'],
        queryFn: () => axiosInstance.get(GET_ALL_BLOGS).then((res) => res.data),
    })
    return <BlogContext.Provider value={blogs}>{children}</BlogContext.Provider>
}

export default BlogContextProvider
