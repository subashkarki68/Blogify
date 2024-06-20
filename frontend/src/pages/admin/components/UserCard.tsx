import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Diag from './Diag'

const UserCard = ({ user, handleDelete }: { user: any; handleDelete: any }) => {
    return (
        <div>
            <Card className="w-full bg-transparent text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-md flex gap-20">
                        <h2 className="mb-5">User Roles:</h2>
                        <div className="mb-5">
                            <div className="flex gap-2">
                                <input type="checkbox" name="user" id="user" />
                                <label htmlFor="user">User</label>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    name="admin"
                                    id="admin"
                                />
                                <label htmlFor="admin">Admin</label>
                            </div>
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
