import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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

interface Password {
    newPassword: string
    cPassword: string
}

function VerifyPasswordToken() {
    const [token, setToken] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const fpSuccess = localStorage.getItem('fpSuccess')
    const fpSuccessOBJ = fpSuccess ? JSON.parse(fpSuccess) : null
    const [success, setSuccess] = useState(fpSuccessOBJ || '')
    const [isWrongToken, setIsWrongToken] = useState(false)
    const [tokenVerified, setTokenVerified] = useState(false)
    const [password, setPassword] = useState<Password>({
        newPassword: '',
        cPassword: '',
    })
    console.log(success)
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
            setIsVerifying(true)
            const { Verify_FP } = URLS
            const res = await axiosInstance.post(Verify_FP, {
                email: success.email,
                token: token,
            })
            console.log(res.data)
            if (res.status === 200) {
                setTokenVerified(true)
            }
            // localStorage.removeItem('fpSuccess')
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
            setIsVerifying(false)
        }
    }

    const handleSubmitNP = () => {}

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
                    disabled={isVerifying || tokenVerified}
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
                    {isVerifying && (
                        <LoaderCircle className="h-9 w-9 animate-spin" />
                    )}
                    {!isVerifying && tokenVerified && (
                        <CheckCircle2Icon className="h-9 w-9 stroke-green-900 dark:stroke-green-400" />
                    )}
                    {isWrongToken && (
                        <CircleXIcon className="h-9 w-9 stroke-red-900 dark:stroke-red-400" />
                    )}
                </div>
            </div>
            {tokenVerified && (
                <div className="flex w-full flex-col gap-4 text-nowrap duration-500 animate-in fade-in zoom-in">
                    <label htmlFor="newpassword" className="inline-block">
                        New Password:
                    </label>
                    {/* TODO: ADD FORM ELEMENT */}
                    <Input
                        name="newpassword"
                        type="password"
                        id="newpassword"
                        placeholder="Enter your new password"
                        value={password.newPassword}
                        onChange={(event) =>
                            setPassword((prev) => ({
                                ...prev,
                                newPassword: event.target.value,
                            }))
                        }
                    />
                    <label
                        htmlFor="confirmnewpassword"
                        className="mt-5 inline-block"
                    >
                        Confirm Password:
                    </label>
                    <Input
                        name="newpassword"
                        type="password"
                        id="confirmnewpassword"
                        placeholder="Enter your new password again"
                        value={password.cPassword}
                        onChange={(event) =>
                            setPassword((prev) => ({
                                ...prev,
                                cPassword: event.target.value,
                            }))
                        }
                    />
                    <Button type="submit" onClick={handleSubmitNP} />
                </div>
            )}
        </div>
    )
}

export default VerifyPasswordToken
