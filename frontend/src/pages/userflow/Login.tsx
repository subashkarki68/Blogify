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
import { Label } from '@/components/ui/label'
import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { CheckCircleIcon, CircleXIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface SuccessFailureStatus {
    status: boolean
    message: string
}

function Login() {
    const location = useLocation()
    const registrationPayload = location?.state || ''

    const [email, setEmail] = useState<string>(
        registrationPayload ? registrationPayload.email : '',
    )
    const [password, setPassword] = useState<string>(
        registrationPayload ? registrationPayload.password : '',
    )
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState<SuccessFailureStatus>({
        status: false,
        message: '',
    })
    const [failure, setFailure] = useState<SuccessFailureStatus>({
        status: false,
        message: '',
    })

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        setSuccess((prev) => ({ ...prev, status: false }))
        setFailure((prev) => ({ ...prev, status: false }))
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setSuccess((prev) => ({ ...prev, status: false }))
        setFailure((prev) => ({ ...prev, status: false }))
    }
    const handleLogin = async () => {
        const { LOGIN } = URLS
        try {
            setIsSubmitting(true)
            const res = await axiosInstance.post(LOGIN, { email, password })
            if (res.status === 200) {
                console.log(res.data.result)
                if (res.data.result) {
                    setSuccess({
                        status: true,
                        message: 'Logged in Successfully',
                    })
                    return setFailure((prev) => ({ ...prev, status: false }))
                }
                return setFailure({
                    status: true,
                    message: 'We cannot log you in right now.',
                })
            }
            console.log('🚀 ~ handleSubmit ~ res:', res)
        } catch (error: any) {
            console.error('error', error)
            const errorMSG = error?.response?.data.msg || 'Something went wrong'
            console.log(errorMSG)
            setFailure({ status: true, message: errorMSG })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="min-w-[400px]">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>Use your email to login</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="john@example.com"
                        required
                        type="email"
                        onChange={handleEmailChange}
                        value={email}
                        autoComplete="email"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        required
                        type="password"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                </div>
                {success.status && (
                    <Alert
                        variant={'default'}
                        className="border-2 border-green-900 text-green-900 dark:border-green-400 dark:text-green-400"
                    >
                        <CheckCircleIcon className="h-5 w-5 stroke-green-900 dark:stroke-green-400" />
                        <AlertTitle>Login Success</AlertTitle>
                        <AlertDescription>
                            {success.message || 'Login Success'}
                        </AlertDescription>
                    </Alert>
                )}

                {failure.status && (
                    <Alert
                        variant={'destructive'}
                        className="border-2 border-red-900 text-red-900 dark:border-red-400 dark:text-red-400"
                    >
                        <CircleXIcon className="h-5 w-5 stroke-red-900 dark:stroke-red-400" />
                        <AlertTitle>Login Failure</AlertTitle>
                        <AlertDescription>
                            {failure.message || 'Something went wrong'}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="flex flex-col gap-4">
                    <Button
                        className="w-full"
                        type="submit"
                        onClick={handleLogin}
                        disabled={isSubmitting}
                    >
                        Login
                    </Button>
                    <Link
                        className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        to={'/user/register'}
                    >
                        Register
                    </Link>
                </div>
                <div className="">
                    <Link
                        to={'/user/forgot-password'}
                        className="hover:underline"
                        state={{ email }}
                    >
                        Forgot Password?
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default Login
