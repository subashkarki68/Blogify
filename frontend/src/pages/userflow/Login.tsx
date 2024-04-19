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
import { useAuthContext } from '@/context/AuthProvider'
import { axiosInstance } from '@/utils/api'
import { CheckCircleIcon, CircleXIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface SuccessFailureStatus {
    status: boolean
    message: string
}

function Login() {
    const location = useLocation()
    const navigate = useNavigate()
    const registrationPayload = location?.state || ''
    const { passwordReset } = location.state || ''

    const initialEmail =
        registrationPayload?.email || passwordReset?.email || ''

    const [email, setEmail] = useState<string>(initialEmail)
    const [password, setPassword] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState<SuccessFailureStatus>({
        status: false,
        message: '',
    })
    const [failure, setFailure] = useState<SuccessFailureStatus>({
        status: false,
        message: '',
    })
    const { user, setUser } = useAuthContext()

    useEffect(() => {
        if (user.userId) navigate('/')
    }, [])

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
                const name = res?.data?.result?.name || 'Unknown'
                const email = res?.data?.result?.email || 'Unknown Email'
                const roles = res?.data?.result?.roles || []
                const userId = res?.data?.result?.user?._id || ''
                let fName = ''
                let lName = ''
                if (name.length > 0) {
                    const splitName = name.split(' ')
                    if (splitName.length > 1) {
                        fName = splitName[0]
                        lName = splitName[splitName.length - 1]
                    }
                    fName = splitName[0]
                }
                if (res.data.result) {
                    setSuccess({
                        status: true,
                        message: 'Logged in Successfully',
                    })
                    setUser({
                        userId,
                        name,
                        email,
                        roles,
                        fName,
                        lName,
                    })
                    localStorage.setItem(
                        'userDetails',
                        JSON.stringify({
                            userId,
                            name,
                            email,
                            roles,
                            fName,
                            lName,
                        }),
                    )
                    if (user?.roles?.includes('admin')) navigate('/admin')
                    navigate('/')
                    return setFailure((prev) => ({ ...prev, status: false }))
                }
                return setFailure({
                    status: true,
                    message: 'We cannot log you in right now.',
                })
            }
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
                {passwordReset && (
                    <Alert
                        variant={'default'}
                        className="border-2 border-green-900 text-green-900 dark:border-green-400 dark:text-green-400"
                    >
                        <CheckCircleIcon className="h-5 w-5 stroke-green-900 dark:stroke-green-400" />
                        <AlertTitle>Password reset successfully</AlertTitle>
                        <AlertDescription>
                            Please login with your new password
                        </AlertDescription>
                    </Alert>
                )}
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
                        value={email || ''}
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
                        value={password || ''}
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
