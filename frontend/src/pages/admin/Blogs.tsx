import BlogCard from '@/components/BlogCard'
import {
    blogsStatus,
    fetchBlogs,
    selectAllBlogs,
} from '@/redux/slices/admin/blogSlice'
import { AppDispatch } from '@/redux/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Blogs() {
    const blogs = useSelector(selectAllBlogs)
    const status = useSelector(blogsStatus)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBlogs())
        }
    }, [blogs, dispatch])

    //Warning: Getting double data due to react strict mode
    console.log('blogs: I am getting double data', blogs)

    let content
    if (status === 'loading') content = <p>Loading...</p>
    else if (status === 'failed') content = <p>Fetching blogs failed</p>
    else if (status === 'succeeded')
        content = blogs.map((blog, i) => (
            <BlogCard
                key={i}
                title={blog.title}
                content={blog.content}
                className="mb-5 w-full"
            />
        ))

    return <div className="w-[80%] pl-5">{content}</div>
}

export default Blogs
