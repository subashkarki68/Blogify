import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { CheckCircleIcon, CircleXIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

interface RegisterPayload {
    email: string
    password: string
    name: string
}

interface SuccessFailureStatus {
    status: boolean
    message: string
}

function Register() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState<SuccessFailureStatus>({
        status: false,
        message: '',
    })
    const [failure, setFailure] = useState<SuccessFailureStatus>({
        status: false,
        message: '',
    })
    const [payload, setPayload] = useState<RegisterPayload>({
        email: '',
        password: '',
        name: '',
    })

    //TODO
    console.log(setPayload)
    console.log(payload)

    const navigate = useNavigate()

    const handleRegister = async (data: any) => {
        const { REGISTER } = URLS
        const { email, name, password } = data
        try {
            setIsSubmitting(true)
            const res = await axiosInstance.post(REGISTER, {
                email,
                name,
                password,
            })
            if (res.status === 200) {
                if (res.data.data) {
                    setSuccess({
                        status: true,
                        message: 'Registration Successful',
                    })
                    navigate('/user/verify-email', {
                        state: { email: data.email, name: data.name },
                    })
                    return setFailure((prev) => ({ ...prev, status: false }))
                }
                return setFailure({
                    status: true,
                    message: 'We cannot Register you in right now.',
                })
            }
        } catch (error: any) {
            console.error('error', error)
            const errorMSG = error?.response?.data.msg || 'Something went wrong'
            setFailure({ status: true, message: errorMSG })
        } finally {
            setIsSubmitting(false)
        }
    }
    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
        },
    })
    return (
        <Card className="min-w-[400px]">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold">Register</CardTitle>
                <CardDescription>Create new account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)}>
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoFocus
                                            id="name"
                                            placeholder="Name"
                                            required
                                            type="text"
                                            autoComplete="name"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="john@example.com"
                                            required
                                            type="email"
                                            autoComplete="email"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            required
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="confirmpassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="confirmpassword"
                                            required
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="my-4">
                            {success.status && (
                                <Alert
                                    variant={'default'}
                                    className="border-2 border-green-900 text-green-900 dark:border-green-400 dark:text-green-400"
                                >
                                    <CheckCircleIcon className="h-5 w-5 stroke-green-900 dark:stroke-green-400" />
                                    <AlertTitle>
                                        Registration Success
                                    </AlertTitle>
                                    <AlertDescription>
                                        {success.message ||
                                            'Registration Success'}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {failure.status && (
                                <Alert
                                    variant={'destructive'}
                                    className="border-2 border-red-900 text-red-900 dark:border-red-400 dark:text-red-400"
                                >
                                    <CircleXIcon className="h-5 w-5 stroke-red-900 dark:stroke-red-400" />
                                    <AlertTitle>
                                        Registration Failure
                                    </AlertTitle>
                                    <AlertDescription>
                                        {failure.message ||
                                            'Something went wrong'}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Register
                            </Button>
                            <Link
                                className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                                to={'/user/login'}
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default Register
