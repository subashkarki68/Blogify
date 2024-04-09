import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

export const useBlogs = (page: number, limit: number) => {
    const { GET_PUBLISHED_BLOGS } = URLS
    const { data, isPending, error, isFetched } = useQuery({
        queryKey: ['blogs', page, limit],
        queryFn: () =>
            axiosInstance
                .get(GET_PUBLISHED_BLOGS + `?page=${page}&limit=${limit}`)
                .then((res) => res.data.data),
    })
    return { data, isPending, error, isFetched }
}
