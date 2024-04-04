import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

interface Password {
    newPassword: string
    confirmPassword: string
}

function NewPassword({
    isLoading,
    handleSubmit,
}: {
    isLoading: boolean
    handleSubmit: (password: Password) => void
}) {
    const [password, setPassword] = useState<Password>({
        newPassword: '',
        confirmPassword: '',
    })

    return (
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
            <label htmlFor="confirmnewpassword" className="mt-5 inline-block">
                Confirm Password:
            </label>
            <Input
                name="newpassword"
                type="password"
                id="confirmnewpassword"
                placeholder="Enter your new password again"
                value={password.confirmPassword}
                onChange={(event) =>
                    setPassword((prev) => ({
                        ...prev,
                        confirmPassword: event.target.value,
                    }))
                }
            />
            <Button
                type="submit"
                onClick={() => {
                    handleSubmit(password)
                }}
            >
                {isLoading ? (
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                    'Submit'
                )}
            </Button>
        </div>
    )
}

export default NewPassword
