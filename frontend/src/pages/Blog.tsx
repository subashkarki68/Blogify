import { BLOGS_URL } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Blog() {
    const navigate = useNavigate()
    const { blogSlug } = useParams()
    const { data, isPending, error } = useQuery({
        queryKey: ['blog', blogSlug],
        queryFn: () =>
            axiosInstance
                .get(BLOGS_URL + `/${blogSlug}`)
                .then((res) => res.data.data),
    })
    useEffect(() => {
        if (!data && !isPending) {
            navigate('/not-found', { replace: true })
        }
    }, [data, isPending])
    return (
        <div>
            {isPending && <p>Loading...</p>}
            {error && <p>Error while fetching post</p>}
            {data && (
                <div className="flex flex-col gap-10">
                    <img
                        src={data?.pictureUrl}
                        alt="Cover Picture"
                        className="m-auto h-[300px] w-full object-contain"
                    />
                    <div className="mx-10 flex flex-col gap-5">
                        <div>
                            <h2 className="text-3xl font-bold">
                                {data?.title}
                            </h2>
                            <div className="flex flex-row gap-10 text-gray-500">
                                <h3>Author: {data?.author?.name}</h3>
                                <h3>
                                    Published:{' '}
                                    {formatDistanceToNow(data?.createdAt) +
                                        ' ago'}
                                </h3>
                                <h3>Duration: {data?.duration} Minutes</h3>
                            </div>
                        </div>
                        <p className="text-lg">{data?.content}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Blog
