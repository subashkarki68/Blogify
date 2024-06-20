import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { UserState } from '@/types/userTypes'
import { useState } from 'react'
import Diag from './Diag'

const UserCard = ({
    user,
    handleDelete,
}: {
    user: UserState
    handleDelete: any
}) => {
    const [isActive, setIsActive] = useState(user.isActive)
    const handleCheckChange = (checked: boolean) => {
        setIsActive((prev) => !prev)
        console.log('check', checked)
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
                            <h2 className="mb-5">User Roles:</h2>
                            <div className="mb-5">
                                <div className="mb-2 flex gap-2">
                                    <Checkbox
                                        id="user"
                                        name="user"
                                        defaultChecked={user.roles.includes(
                                            'user',
                                        )}
                                    />
                                    <label
                                        htmlFor="user"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        User
                                    </label>
                                </div>
                                <div className="flex gap-2">
                                    <Checkbox
                                        id="admin"
                                        name="admin"
                                        defaultChecked={user.roles.includes(
                                            'admin',
                                        )}
                                    />
                                    <label
                                        htmlFor="admin"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Admin
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="isActive" id="draft">
                                Active
                            </Label>
                            <Switch
                                id="isActive"
                                checked={isActive}
                                onCheckedChange={handleCheckChange}
                            />
                            <Label htmlFor="blog-status" id="Published">
                                Not Active
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
