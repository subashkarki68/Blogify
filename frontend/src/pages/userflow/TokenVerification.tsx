import { Button } from '@/components/ui/button'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useState } from 'react'

function TokenVerification() {
    const [value, setValue] = useState('')

    return (
        <div className="flex flex-col items-center gap-8">
            <p className="text-primary">
                Enter the code you got in your email:
            </p>
            <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={value}
                onChange={(value) => setValue(value)}
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
            <Button className="transition-all duration-300 ease-in-out hover:scale-125 md:text-xl">
                Submit
            </Button>
        </div>
    )
}

export default TokenVerification
