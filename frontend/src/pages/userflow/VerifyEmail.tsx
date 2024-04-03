import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'
import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { CheckCircleIcon, CircleXIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function VerifyEmail() {
    const location = useLocation()
    const navigate = useNavigate()
    const email = location?.state?.email || ''
    const password = location?.state?.password || ''
    const [token, setToken] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const [isWrongToken, setIsWrongToken] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const inputOtpSlotClasses = `text-xl md:h-16 md:w-16 ${isWrongToken && 'border-red-900 text-red-900 dark:border-red-400 dark:text-red-400'}`

    useEffect(() => {
        if (!email || !password) {
            // Redirect to the home page
            navigate('/')
        }
    }, [email]) // Only run this effect when email or password changes

    const handleChange = (value: any) => {
        if (successMessage.length > 0) {
            return setIsVerifying(true)
        }
        setIsVerifying(false)
        setIsWrongToken(false)
        setToken(value)
    }

    const handleComplete = async () => {
        try {
            if (!token) throw new Error('No Token Provided')
            setIsVerifying(true)
            const { Verify_Email } = URLS
            const res = await axiosInstance.post(Verify_Email, {
                email,
                emailVerifyToken: token,
            })
            if (res.status === 200) {
                setSuccessMessage(res?.data?.result?.message || 'Success')
                navigate('/user/login', { state: { email, password } })
            }
            console.log(res)
        } catch (error: any) {
            setIsWrongToken(true)
            // Handle errors appropriately
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error(
                    'Server responded with error:',
                    error.response.data,
                )
                console.error('Status code:', error.response.status)
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request)
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error setting up the request:', error.message)
            }
            // Optionally, you might want to notify the user about the error
            // or perform other actions such as logging, analytics, etc.
            // You can also throw the error again if you want it to propagate to the caller
            // throw error;
        } finally {
            if (successMessage.length > 0) {
                return setIsVerifying(true)
            }
            setIsVerifying(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <p className="text-primary">
                Enter the verification code you got in your email:
            </p>
            <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
                disabled={isVerifying}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} className={inputOtpSlotClasses} />
                    <InputOTPSlot index={1} className={inputOtpSlotClasses} />
                    <InputOTPSlot index={2} className={inputOtpSlotClasses} />
                    <InputOTPSlot index={3} className={inputOtpSlotClasses} />
                    <InputOTPSlot index={4} className={inputOtpSlotClasses} />
                    <InputOTPSlot index={5} className={inputOtpSlotClasses} />
                </InputOTPGroup>
            </InputOTP>
            {successMessage && !isWrongToken && (
                <Alert
                    variant={'default'}
                    className="border-2 border-green-900 text-green-900 dark:border-green-400 dark:text-green-400"
                >
                    <CheckCircleIcon className="h-5 w-5 stroke-green-900 dark:stroke-green-400" />
                    <AlertTitle>Verification Success</AlertTitle>
                    <AlertDescription>
                        {successMessage || 'Success'}
                    </AlertDescription>
                </Alert>
            )}
            {isWrongToken && (
                <Alert
                    variant={'destructive'}
                    className="border-2 border-red-900 text-red-900 dark:border-red-400 dark:text-red-400"
                >
                    <CircleXIcon className="h-5 w-5 stroke-red-900 dark:stroke-red-400" />
                    <AlertTitle>Verification Failure</AlertTitle>
                    <AlertDescription>Token mismatch</AlertDescription>
                </Alert>
            )}
        </div>
    )
}

export default VerifyEmail
