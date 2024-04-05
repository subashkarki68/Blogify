import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

function Home() {
    const { GET_ALL_BLOGS } = URLS.ADMIN
    const {
        data: blogs,
        isPending,
        error,
    } = useQuery({
        queryKey: ['blogs'],
        queryFn: () =>
            axiosInstance
                .get(GET_ALL_BLOGS + '?page=2&limit=10')
                .then((res) => res.data),
    })
    console.log('🚀 ~ Home ~ error:', error)
    console.log('🚀 ~ Home ~ isPending:', isPending)
    console.log('🚀 ~ Home ~ blogs:', blogs)
    return <div>Home</div>
}

export default Home
