import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
    resetPassword,
    updateEmailVerified,
    updateIsActive,
    updateUser,
} from '@/redux/slices/admin/userSlice'
import { AppDispatch } from '@/redux/store'
import { UserState } from '@/types/userTypes'
import { CheckCheckIcon, FilePenLineIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

const UserCard = ({ user }: { user: UserState }) => {
    const [isActive, setIsActive] = useState(user.isActive)
    const [emailVerified, setEmailVerified] = useState(user.emailVerified)
    const [isEditingName, setIsEditingName] = useState(false)
    const [name, setName] = useState(user.name)

    const [isEmailUpdated, setIsEmailUpdated] = useState(false)
    const [isPasswordUpdated, setIsPasswordUpdated] = useState(false)

    const dispatch: AppDispatch = useDispatch()

    const emailRef = useRef<HTMLInputElement>(null)
    const newPasswordRef = useRef<HTMLInputElement>(null)

    const handleIsActiveCheckChange = (checked: boolean) => {
        setIsActive((prev) => !prev)
        dispatch(updateIsActive({ email: user.email, isActive: checked })).then(
            (action) => {
                if (updateIsActive.fulfilled.match(action)) {
                    console.log('User updated successfully')
                } else {
                    console.log('User update failed')
                }
            },
        )
    }

    const handleEmailVerifyCheckChanged = (checked: boolean) => {
        setEmailVerified((prev) => !prev)
        dispatch(
            updateEmailVerified({ email: user.email, emailVerified: checked }),
        ).then((action) => {
            if (updateEmailVerified.fulfilled.match(action)) {
                console.log('User updated successfully')
            } else {
                console.log('User update failed')
            }
        })
    }

    const handleEmailSubmit = () => {
        if (emailRef.current) {
            dispatch(
                updateUser({
                    _id: user._id,
                    rest: { email: emailRef.current.value },
                }),
            ).then((action) => {
                if (updateUser.fulfilled.match(action)) {
                    console.log('Update successful:', action.payload)
                    setIsEmailUpdated(true)
                    setTimeout(() => {
                        setIsEmailUpdated(false)
                    }, 1500)
                } else {
                    console.error('Update failed:', action.error)
                    if (action?.error?.message) {
                        if (action.error.message.includes('500')) {
                            alert('Email Already Exists')
                        }
                    }
                    setIsEmailUpdated(false)
                }
            })
        }
    }

    const handlePasswordSubmit = () => {
        if (newPasswordRef.current) {
            dispatch(
                resetPassword({
                    email: user.email,
                    newPassword: newPasswordRef.current.value,
                }),
            ).then((action) => {
                if (resetPassword.fulfilled.match(action)) {
                    console.log('Update successful:', action.payload)
                    setIsPasswordUpdated(true)
                    setTimeout(() => {
                        setIsPasswordUpdated(false)
                    }, 1500)
                } else {
                    console.error('Update failed:', action.error)
                }
            })
        }
    }

    const handleIconClick = () => {
        setIsEditingName(true)
    }

    const handleChangeNameClick = () => {
        setIsEditingName(false)
        dispatch(
            updateUser({
                _id: user._id,
                rest: { name },
            }),
        ).then((action) => {
            if (updateUser.fulfilled.match(action)) {
                console.log('Update successful:', action.payload)
            } else {
                console.error('Update failed:', action.error)
            }
        })
    }

    const handleRoleChange = (roleName: string, state: string | boolean) => {
        console.log('RoleName, State', roleName, state)
        let role = [...user.roles]
        if (state) {
            if (!role.includes(roleName)) {
                role.push(roleName)
                console.log('role')
            }
        } else {
            role = role.filter((role) => role !== roleName)
            console.log('role')
        }

        dispatch(updateUser({ _id: user._id, rest: { roles: role } })).then(
            (action) => {
                if (updateUser.fulfilled.match(action)) {
                    console.log('Update successful:', action.payload)
                } else {
                    console.error('Update failed:', action.error)
                }
            },
        )
    }

    return (
        <div className="mb-10">
            <style>
                {`
                    .custom-selection::selection {
                        background: black;
                        color: red; /* Optional: to change the text color as well */
                    }
                `}
            </style>
            <Card className="custom-selection w-full bg-transparent text-white">
                <CardHeader>
                    <CardTitle className=" flex items-center gap-2 text-2xl">
                        {isEditingName ? (
                            <input
                                className="custom-selection p-2 text-black"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={handleChangeNameClick}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleChangeNameClick()
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <span className="custom-selection p-2">{name}</span>
                        )}
                        <FilePenLineIcon
                            className="cursor-pointer"
                            onClick={handleIconClick}
                        />
                        {isEditingName && (
                            <Button
                                className="rounded-2xl"
                                onClick={handleChangeNameClick}
                            >
                                Change
                            </Button>
                        )}
                    </CardTitle>
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
                                        onCheckedChange={(state) =>
                                            handleRoleChange('user', state)
                                        }
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
                                        onCheckedChange={(state) =>
                                            handleRoleChange('admin', state)
                                        }
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
                                    {!isEmailUpdated ? (
                                        'Change'
                                    ) : (
                                        <CheckCheckIcon className="stroke-green-500" />
                                    )}
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
                                    {!isPasswordUpdated ? (
                                        'Change'
                                    ) : (
                                        <CheckCheckIcon className="stroke-green-500" />
                                    )}
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
                </CardContent>
            </Card>
        </div>
    )
}

export default UserCard
