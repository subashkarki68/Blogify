import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'
import { URLS } from '@/constants'
import { axiosInstance } from '@/utils/api'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import {
    CheckCircle2Icon,
    CheckCircleIcon,
    CircleXIcon,
    LoaderCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewPassword from './NewPassword'

interface Password {
    newPassword: string
    confirmPassword: string
}

function VerifyPasswordToken() {
    const [token, setToken] = useState('')
    const [isTokenVerifying, setIsTokenVerifying] = useState(false)
    const [isNewPasswordVerifying, setIsNewPasswordVerifying] = useState(false)

    const fpSuccess = localStorage.getItem('fpSuccess')
    const fpSuccessOBJ = fpSuccess ? JSON.parse(fpSuccess) : null
    // const [success, setSuccess] = useState(fpSuccessOBJ || '')
    const success = fpSuccessOBJ || ''
    const [isWrongToken, setIsWrongToken] = useState(false)
    const [tokenVerified, setTokenVerified] = useState(false)

    const email = success.email || ''
    const navigate = useNavigate()

    useEffect(() => {
        if (!success) navigate('/')
    }, [success])

    const handleChange = (value: any) => {
        setToken(value)
        setTokenVerified(false)
        setIsWrongToken(false)
    }

    const handleComplete = async () => {
        try {
            setIsTokenVerifying(true)
            const { Verify_FP } = URLS
            const res = await axiosInstance.post(Verify_FP, {
                email: success.email,
                token: token,
            })
            console.log(res.data)
            if (res.status === 200) {
                setTokenVerified(true)
            }
        } catch (error: any) {
            setTokenVerified(false)
            setIsWrongToken(true)
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
        } finally {
            setIsTokenVerifying(false)
        }
    }

    const handleNewPasswordSubmit = async (password: Password) => {
        try {
            const { Change_Forgotten_Password } = URLS
            setIsNewPasswordVerifying(true)
            const res = await axiosInstance.post(Change_Forgotten_Password, {
                email: success.email,
                newPassword: password.newPassword,
                token,
            })
            if (res.status === 200) {
                localStorage.removeItem('fpSuccess')
                navigate('/user/login', {
                    state:
                        { passwordReset: { ...res.data.result, email } } || '',
                })
            }
        } catch (error: any) {
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
        } finally {
            setIsNewPasswordVerifying(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-8">
            {success.status && (
                <Alert
                    variant={'default'}
                    className="border-2 border-green-900 text-green-900 dark:border-green-400 dark:text-green-400"
                >
                    <CheckCircleIcon className="h-5 w-5 stroke-green-900 dark:stroke-green-400" />
                    <AlertTitle>
                        {success.message.title || 'Forgot Password Token Sent'}
                    </AlertTitle>
                    <AlertDescription>
                        {success.message.body || 'Forgot Password Token Sent'}
                    </AlertDescription>
                </Alert>
            )}
            <p className="text-primary">
                Enter the code you got in your email:
            </p>
            <div className="flex items-center gap-8">
                <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={token}
                    onChange={(value) => handleChange(value)}
                    onComplete={handleComplete}
                    disabled={isTokenVerifying || tokenVerified}
                    autoFocus={true}
                >
                    <InputOTPGroup>
                        <InputOTPSlot
                            index={0}
                            className="text-xl md:h-16 md:w-16"
                        />
                        <InputOTPSlot
                            index={1}
                            className="text-xl md:h-16 md:w-16"
                        />
                        <InputOTPSlot
                            index={2}
                            className="text-xl md:h-16 md:w-16"
                        />
                        <InputOTPSlot
                            index={3}
                            className="text-xl md:h-16 md:w-16"
                        />
                        <InputOTPSlot
                            index={4}
                            className="text-xl md:h-16 md:w-16"
                        />
                        <InputOTPSlot
                            index={5}
                            className="text-xl md:h-16 md:w-16"
                        />
                    </InputOTPGroup>
                </InputOTP>
                <div className="h-9 w-9">
                    {isTokenVerifying && (
                        <LoaderCircle className="h-9 w-9 animate-spin" />
                    )}
                    {!isTokenVerifying && tokenVerified && (
                        <CheckCircle2Icon className="h-9 w-9 stroke-green-900 dark:stroke-green-400" />
                    )}
                    {isWrongToken && (
                        <CircleXIcon className="h-9 w-9 stroke-red-900 dark:stroke-red-400" />
                    )}
                </div>
            </div>
            {tokenVerified && (
                <NewPassword
                    handleSubmit={handleNewPasswordSubmit}
                    isLoading={isNewPasswordVerifying}
                />
            )}
        </div>
    )
}

export default VerifyPasswordToken
