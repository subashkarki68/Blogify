import { Button, buttonVariants } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { updateBlog } from '@/redux/slices/admin/blogSlice'
import { AppDispatch } from '@/redux/store'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

interface BlogEditProps {
    slug: string
    title: string
    content: string
}

const BlogEdit = ({ slug, title, content }: BlogEditProps) => {
    const dispatch: AppDispatch = useDispatch()

    const form = useForm({
        defaultValues: {
            title,
            content,
        },
    })
    const onSubmit = (data: any) => {
        console.log('submitted with:', data)
        dispatch(
            updateBlog({
                slug,
                payload: { title: data.title, content: data.content },
            }),
        )
    }
    return (
        <Sheet>
            <SheetTrigger className={`button ${buttonVariants()}`}>
                Edit Post
            </SheetTrigger>
            <SheetContent side={'bottom'}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6"
                        encType="multipart/form-data"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Blog title goes here"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Blog title
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Content goes here"
                                            {...field}
                                            className="h-[100px] resize-none"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Blog Content
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="sugar"
                            render={({
                                field: { value, onChange, ...fieldProps },
                            }) => (
                                <FormItem>
                                    <FormLabel>File</FormLabel>
                                    <FormControl>
                                        <Input type="file" {...fieldProps} />
                                    </FormControl>
                                    <FormDescription>Blog file</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <SheetClose asChild>
                            <Button type="submit">submit</Button>
                        </SheetClose>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default BlogEdit
