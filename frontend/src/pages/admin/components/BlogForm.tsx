import { Button } from '@/components/ui/button'
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
import { SheetClose } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'

interface BlogFormProps {
    title?: string
    content?: string
    onSubmit: (data: { title: string; content: string }) => void
}

const BlogForm: React.FC<BlogFormProps> = ({
    title = '',
    content = '',
    onSubmit,
}) => {
    const form = useForm({
        defaultValues: {
            title,
            content,
        },
    })
    return (
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
                                    placeholder="Blog title goes here || title length must be at least 10 characters
                                    long"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Blog title</FormDescription>
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
                                    placeholder="Content goes here || content length must be at least 20 characters
                                    long"
                                    {...field}
                                    className="h-[100px] resize-none"
                                />
                            </FormControl>
                            <FormDescription>Blog Content</FormDescription>
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
    )
}

export default BlogForm
