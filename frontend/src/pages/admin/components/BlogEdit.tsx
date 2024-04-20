import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { deleteBlog, updateBlog } from '@/redux/slices/admin/blogSlice'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'
import BlogForm from './BlogForm'
import Diag from './Diag'

interface BlogEditProps {
    slug: string
    title: string
    content: string
}

const BlogEdit = ({ slug, title, content }: BlogEditProps) => {
    const dispatch: AppDispatch = useDispatch()

    const onSubmit = (data: any) => {
        console.log('submitted with:', data)
        dispatch(
            updateBlog({
                slug,
                payload: { title: data.title, content: data.content },
            }),
        )
    }
    const handleDelete = () => {
        dispatch(deleteBlog(slug))
    }
    return (
        <div className="flex gap-2">
            <Diag
                trigger="Delete Blog"
                title="Are you sure you want to delete the blog post?"
                desc={`After Deleting the Post you won't be able to recover the blog post.`}
                action={handleDelete}
            />
            <Sheet>
                <SheetTrigger
                    className={`button ${buttonVariants({ variant: 'secondary' })}`}
                >
                    Edit Post
                </SheetTrigger>
                <SheetContent side={'bottom'}>
                    <BlogForm
                        title={title}
                        content={content}
                        onSubmit={onSubmit}
                    />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default BlogEdit
