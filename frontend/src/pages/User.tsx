import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useAuthContext } from '@/context/AuthProvider'
import capitalCase from '@/utils/capitalCase'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function User() {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user?.userId) navigate('/')
    }, [user])

    const initials = user?.fName
        ? user?.lName
            ? user.fName[0].toUpperCase() + user.lName[0].toUpperCase()
            : user.fName[0].toUpperCase()
        : ''

    return (
        <div>
            <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                alt="@shadcn"
                                src="/placeholder-avatar.jpg"
                            />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1 text-center">
                            <h2 className="text-xl font-semibold">
                                {capitalCase(
                                    (user?.fName ?? '') +
                                        ' ' +
                                        (user?.lName ?? ''),
                                )}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                {user?.email ?? ''}
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                                <CardDescription>
                                    Update your profile information.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="profile-picture">
                                        Profile Picture
                                    </Label>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage
                                                alt="@shadcn"
                                                src="/placeholder-avatar.jpg"
                                            />
                                            <AvatarFallback>
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button variant="outline">
                                            Change
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        defaultValue={user?.email ?? ''}
                                        id="email"
                                        type="email"
                                        disabled
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="roles">Your Roles</Label>
                                    <Input
                                        defaultValue={user?.roles ?? ''}
                                        id="roles"
                                        type="text"
                                        disabled
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        defaultValue={user?.name ?? ''}
                                        id="name"
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">
                                        New Password
                                    </Label>
                                    <Input id="password" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="ml-auto">
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                        {/* TODO Complete Later */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings - sample</CardTitle>
                                <CardDescription>
                                    Manage your account settings.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-medium">
                                            Dark Mode
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Switch to a dark color scheme.
                                        </p>
                                    </div>
                                    <Switch id="dark-mode" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-medium">
                                            Email Notifications
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Receive email notifications for new
                                            updates.
                                        </p>
                                    </div>
                                    <Switch
                                        defaultChecked
                                        id="email-notifications"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-medium">
                                            Two-Factor Authentication
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Enhance your account security.
                                        </p>
                                    </div>
                                    <Switch id="two-factor-auth" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
