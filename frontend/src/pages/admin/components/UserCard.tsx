import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
    updateEmailVerified,
    updateIsActive,
} from '@/redux/slices/admin/userSlice'
import { AppDispatch } from '@/redux/store'
import { UserState } from '@/types/userTypes'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Diag from './Diag'

const UserCard = ({
    user,
    handleDelete,
}: {
    user: UserState
    handleDelete: any
}) => {
    const [isActive, setIsActive] = useState(user.isActive)
    const [emailVerified, setEmailVerified] = useState(user.emailVerified)
    const dispatch: AppDispatch = useDispatch()

    const emailRef = useRef<HTMLInputElement>(null)
    const newPasswordRef = useRef<HTMLInputElement>(null)

    const handleIsActiveCheckChange = (checked: boolean) => {
        setIsActive((prev) => !prev)
        dispatch(updateIsActive({ email: user.email, isActive: checked }))
    }

    const handleEmailVerifyCheckChanged = (checked: boolean) => {
        setEmailVerified((prev) => !prev)
        dispatch(
            updateEmailVerified({ email: user.email, emailVerified: checked }),
        )
    }

    const handleEmailSubmit = () => {
        if (emailRef.current) {
        }
    }

    const handlePasswordSubmit = () => {
        if (newPasswordRef.current) {
        }
    }

    return (
        <div className="mb-10">
            <Card className="w-full bg-transparent text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-md flex flex-col">
                        <div className="flex flex-row gap-20">
                            <h2>User Roles:</h2>
                            <div className="mb-5">
                                <div className="mb-2 flex gap-2">
                                    <Checkbox
                                        id={`user-${user._id}`}
                                        name="user"
                                        defaultChecked={user.roles.includes(
                                            'user',
                                        )}
                                    />
                                    <label
                                        htmlFor={`user-${user._id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        User
                                    </label>
                                </div>
                                <div className="flex gap-2">
                                    <Checkbox
                                        id={`admin-${user._id}`}
                                        name="admin"
                                        defaultChecked={user.roles.includes(
                                            'admin',
                                        )}
                                    />
                                    <label
                                        htmlFor={`admin-${user._id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Admin
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5 flex items-center gap-20">
                            <h2>Email:</h2>
                            <div className="flex flex-row items-center gap-10">
                                <input
                                    className="h-7 w-[200px] px-2 text-black"
                                    type="email"
                                    name="email"
                                    id={`email-${user._id}`}
                                    placeholder="john.doe@email.com"
                                    ref={emailRef}
                                    defaultValue={user.email}
                                    autoComplete="email"
                                />
                                <Button
                                    className="rounded-2xl"
                                    onClick={handleEmailSubmit}
                                >
                                    Change Email
                                </Button>
                            </div>
                        </div>
                        <div className="mb-5 flex items-center gap-20">
                            <h2>New Password:</h2>
                            <div className="flex flex-row items-center gap-10">
                                <input
                                    className="h-7 w-[150px] px-2 text-black"
                                    type="password"
                                    name="password"
                                    id={`password-${user._id}`}
                                    ref={newPasswordRef}
                                />
                                <Button
                                    className="rounded-2xl"
                                    onClick={handlePasswordSubmit}
                                >
                                    Change
                                </Button>
                            </div>
                        </div>
                        <div className="mb-5 flex items-center space-x-2">
                            <Label htmlFor={`emailVerified-${user._id}`}>
                                Not Verified
                            </Label>
                            <Switch
                                id={`emailVerified-${user._id}`}
                                checked={emailVerified}
                                onCheckedChange={handleEmailVerifyCheckChanged}
                            />
                            <Label htmlFor="emailVerified">
                                Email Verified
                            </Label>
                        </div>
                        <div className="mb-5 flex items-center space-x-2">
                            <Label htmlFor="isActive">Not Active</Label>
                            <Switch
                                id={`isActive-${user._id}`}
                                checked={isActive}
                                onCheckedChange={handleIsActiveCheckChange}
                            />
                            <Label htmlFor={`isActive-${user._id}`}>
                                Active
                            </Label>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse">
                        <Diag
                            trigger="Delete User"
                            title="Are you sure you want to delete this User?"
                            action={handleDelete}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserCard
