import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { Label } from '@radix-ui/react-label'
import { CheckCircleIcon, CircleXIcon } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
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
    const [prepayload, setPrepayload] = useState({
        confirmpassword: '',
    })
    console.log(prepayload)

    const navigate = useNavigate()
    const handlePayloadChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPayload((prev) => ({ ...prev, [e.target.id]: e.target?.value }))
        setSuccess((prev) => ({ ...prev, status: false }))
        setFailure((prev) => ({ ...prev, status: false }))
    }
    const handleRegister = async () => {
        const { REGISTER } = URLS
        try {
            setIsSubmitting(true)
            const res = await axiosInstance.post(REGISTER, payload)
            if (res.status === 200) {
                if (res.data.data) {
                    setSuccess({
                        status: true,
                        message: 'Registration Successful',
                    })
                    navigate('/user/verify-email', { state: payload })
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
    return (
        <Card className="min-w-[400px]">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold">Register</CardTitle>
                <CardDescription>Create new account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        type="text"
                        name="name"
                        onChange={handlePayloadChange}
                        autoComplete="name"
                        value={payload.name}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        id="email"
                        placeholder="john@example.com"
                        required
                        type="email"
                        onChange={handlePayloadChange}
                        autoComplete="email"
                        value={payload.email}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        required
                        name="password"
                        type="password"
                        onChange={handlePayloadChange}
                        autoComplete="new-password"
                        value={payload.password}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmpassword">Confirm Password</Label>
                    <Input
                        id="confirmpassword"
                        required
                        name="confirmpassword"
                        type="password"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setPrepayload((prev) => ({
                                ...prev,
                                confirmpassword: e.target.value,
                            }))
                        }
                    />
                </div>
                {success.status && (
                    <Alert
                        variant={'default'}
                        className="border-2 border-green-900 text-green-900 dark:border-green-400 dark:text-green-400"
                    >
                        <CheckCircleIcon className="h-5 w-5 stroke-green-900 dark:stroke-green-400" />
                        <AlertTitle>Registration Success</AlertTitle>
                        <AlertDescription>
                            {success.message || 'Registration Success'}
                        </AlertDescription>
                    </Alert>
                )}

                {failure.status && (
                    <Alert
                        variant={'destructive'}
                        className="border-2 border-red-900 text-red-900 dark:border-red-400 dark:text-red-400"
                    >
                        <CircleXIcon className="h-5 w-5 stroke-red-900 dark:stroke-red-400" />
                        <AlertTitle>Registration Failure</AlertTitle>
                        <AlertDescription>
                            {failure.message || 'Something went wrong'}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="flex flex-col gap-4">
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleRegister}
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
            </CardContent>
        </Card>
    )
}

export default Register
