import { useParams } from 'react-router-dom'

function Blog() {
    const { blogSlug } = useParams()
    // const { data, isPending, error, isFetched } = useQuery({
    //     queryKey: ['blog', blogSlug],
    //     queryFn: () =>
    //         axiosInstance
    //             .get(BLOGS_URL + `/${blogSlug}`)
    //             .then((res) => res.data.data),
    // })
    return <div>{blogSlug}</div>
}

export default Blog
