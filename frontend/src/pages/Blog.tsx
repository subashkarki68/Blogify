import { BLOGS_URL } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

function Blog() {
    const { blogSlug } = useParams()
    const { data, isPending, error, isFetched } = useQuery({
        queryKey: ['blog', blogSlug],
        queryFn: () =>
            axiosInstance
                .get(BLOGS_URL + `/${blogSlug}`)
                .then((res) => res.data.data),
    })
    console.log(data)
    return <div>{blogSlug}</div>
}

export default Blog
