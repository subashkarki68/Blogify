import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'

export interface Blog {
    title: string
    content: string
}

export interface Q {
    total: number
    page: number
    limit: number
}

interface BlogContextType {
    data: { data: Blog[] }
    isPending: boolean
    error: Error | null
    isFetched: boolean
    setPage: (page: number) => void
    setLimit: (limit: number) => void
    page: number
    limit: number
    total: number
    setQ: (q: Q) => void
}
const BlogContext = createContext<BlogContextType | undefined>(undefined)
// const BlogContext = createContext<any>(undefined)

export function BlogContextProvider({ children }: { children: ReactNode }) {
    const { GET_PUBLISHED_BLOGS } = URLS
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    const [total, setTotal] = useState(0)

    const [q, setQ] = useState<Q>({
        total: 0,
        page: 1,
        limit: 5,
    })
    const { data, isPending, error, isFetched } = useQuery({
        queryKey: ['blogs', page, limit],
        queryFn: () =>
            axiosInstance
                .get(GET_PUBLISHED_BLOGS + `?page=${page}&limit=${limit}`)
                .then((res) => res.data.data),
    })
    console.log('blog context', data)
    useEffect(() => {
        if (isFetched) setTotal(data?.total)
    }, [data])
    console.log('blogcobtext total', data?.total)
    return (
        <BlogContext.Provider
            value={
                {
                    data,
                    isPending,
                    error,
                    isFetched,
                    setQ,
                    setPage,
                    setLimit,
                    page,
                    limit,
                    total,
                } as BlogContextType
            }
        >
            {children}
        </BlogContext.Provider>
    )
}

export function useBlogContext() {
    const blogs = useContext(BlogContext)
    // const setQ = useContext(BlogContext)

    if (blogs === undefined) {
        throw new Error('useBlogContext must be used with a BlogContext')
    }
    // if (setQ === undefined) {
    //     throw new Error('query setters are undefined')
    // }

    return { blogs }
}
