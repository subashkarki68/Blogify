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
import { CircleXIcon, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface SuccessFailureStatus {
    status: boolean
    message: { title: string; body: string }
}

function ForgotPassword() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [email, setEmail] = useState(state?.email || '')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // const [success, setSuccess] = useState<SuccessFailureStatus>({
    //     status: false,
    //     message: { title: '', body: '' },
    // })

    const [failure, setFailure] = useState<SuccessFailureStatus>({
        status: false,
        message: { title: '', body: '' },
    })

    const handleSubmit = async () => {
        try {
            const { GENERATE_FP } = URLS

            setIsSubmitting(true)
            const res = await axiosInstance.post(GENERATE_FP, { email })
            if (res.status === 200) {
                if (res.data.data) {
                    navigate('/user/verify-password-token')
                    localStorage.setItem(
                        'fpSuccess',
                        JSON.stringify({
                            status: true,
                            message: {
                                title: 'Success',
                                body:
                                    res?.data?.data ||
                                    'Token sent to your email',
                            },
                            email,
                        }),
                    )
                    return setFailure((prev) => ({ ...prev, status: false }))
                }
                return setFailure({
                    status: true,
                    message: {
                        title: 'Failed to generate forgot password',
                        body: "User doesn't exist",
                    },
                })
            }
        } catch (error: any) {
            console.error('error', error)
            const errorMSG =
                error?.response?.data.msg.replace('Error: ', '') ||
                'Something went wrong'
            console.log(errorMSG)
            setFailure({
                status: true,
                message: { title: 'Error', body: errorMSG },
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="min-w-[400px]">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-bold">
                    Forgot Password
                </CardTitle>
                <CardDescription>
                    We will send you a verification token in your email.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="john@example.com"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    {/* <Button className="w-full" type="submit">
                        Register
                    </Button> */}
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <LoaderCircle className="h-5 w-5 animate-spin" />
                        ) : (
                            'Send Email'
                        )}
                    </Button>

                    {failure.status && (
                        <Alert
                            variant={'destructive'}
                            className="border-2 border-red-900 text-red-900 dark:border-red-400 dark:text-red-400"
                        >
                            <CircleXIcon className="h-5 w-5 stroke-red-900 dark:stroke-red-400" />
                            <AlertTitle>{failure.message.title}</AlertTitle>
                            <AlertDescription>
                                {failure.message.body || 'Something went wrong'}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default ForgotPassword
