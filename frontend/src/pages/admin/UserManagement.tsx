import { Button, buttonVariants } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { URLS } from '@/constants'
import {
    fetchUsers,
    selectAllUsers,
    userStatus,
} from '@/redux/slices/admin/userSlice'
import { AppDispatch } from '@/redux/store'
import { axiosInstance } from '@/utils/api'
import { CheckCheckIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterPayload, SuccessFailureStatus } from '../userflow/Register'
import UserCard from './components/UserCard'

const UserManagement = () => {
    const users = useSelector(selectAllUsers)
    const status = useSelector(userStatus)
    const dispatch: AppDispatch = useDispatch()

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

    console.log(setPayload)
    console.log(payload)
    console.log(failure)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers({ limit: 10, page: 1 }))
        }
    }, [users, dispatch])

    useEffect(() => {
        if (success.status) {
            const timer = setTimeout(() => {
                setSuccess((prev) => ({ ...prev, status: false }))
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [success, setSuccess])

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

                    return setFailure((prev: any) => ({
                        ...prev,
                        status: false,
                    }))
                }
                return setFailure({
                    status: true,
                    message: 'We cannot Register you in right now.',
                })
            }
        } catch (error: any) {
            console.error('error', error)
            if (error?.message.includes('500')) {
                alert('Email already exists')
            }
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
        <div>
            <div className="mb-10 pl-5">
                <Sheet>
                    <SheetTrigger className={`button ${buttonVariants()}`}>
                        Add New User
                    </SheetTrigger>
                    <SheetContent side={'bottom'}>
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
                                                    placeholder="Email"
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
                                <Button
                                    className="w-full"
                                    disabled={isSubmitting}
                                    type="submit"
                                >
                                    {!success.status ? (
                                        'Add User'
                                    ) : (
                                        <CheckCheckIcon className="stroke-green-500" />
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="ml-20 w-1/2">
                {users &&
                    users.map((user) => {
                        return <UserCard key={user._id} user={user} />
                    })}
            </div>
        </div>
    )
}

export default UserManagement
