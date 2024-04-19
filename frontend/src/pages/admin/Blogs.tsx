import BlogCard from '@/components/BlogCard'
import {
    blogsStatus,
    fetchBlogs,
    selectAllBlogs,
    updateBlogStatus,
} from '@/redux/slices/admin/blogSlice'
import { AppDispatch } from '@/redux/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogAuthor from './components/BlogAuthor'
import BlogEdit from './components/BlogEdit'
import BlogStatus from './components/BlogStatus'

function Blogs() {
    const blogs = useSelector(selectAllBlogs)
    const status = useSelector(blogsStatus)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBlogs())
        }
    }, [blogs, dispatch])

    const handleStatusChange = (
        slug: string,
        blogStatus: 'published' | 'draft',
    ) => {
        dispatch(updateBlogStatus({ slug, blogStatus }))
    }
    //Warning: Getting double data due to react strict mode
    console.log('blogs: I am getting double data', blogs)

    let content
    if (status === 'loading') content = <p>Loading...</p>
    else if (status === 'failed') content = <p>Fetching blogs failed</p>
    else if (status === 'succeeded')
        content = blogs.map((blog, i) => (
            <div
                key={i}
                className="mb-5 flex w-full flex-col gap-5 border-b-2 p-5"
            >
                <div className="flex items-center justify-between">
                    <BlogAuthor author={blog.author} />
                    <div className="flex items-center gap-5">
                        <BlogStatus
                            slug={blog.slug}
                            status={blog.status}
                            onStatusChange={handleStatusChange}
                        />
                        <BlogEdit
                            slug={blog.slug}
                            title={blog.title}
                            content={blog.content}
                        />
                    </div>
                </div>
                <BlogCard title={blog.title} content={blog.content} />
            </div>
        ))

    return <div className="w-[80%] pl-5">{content}</div>
}

export default Blogs
