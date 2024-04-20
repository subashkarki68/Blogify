import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { addNewBlog } from '@/redux/slices/admin/blogSlice'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'
import BlogForm from './BlogForm'

const AddNewBlog = () => {
    const dispatch: AppDispatch = useDispatch()
    const onSubmit = (data: any) => {
        dispatch(addNewBlog(data))
    }
    return (
        <Sheet>
            <SheetTrigger className={`button ${buttonVariants()}`}>
                Add New Blog
            </SheetTrigger>
            <SheetContent side={'bottom'}>
                <BlogForm onSubmit={onSubmit} />
            </SheetContent>
        </Sheet>
    )
}

export default AddNewBlog
