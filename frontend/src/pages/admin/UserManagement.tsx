import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
    fetchUsers,
    selectAllUsers,
    userStatus,
} from '@/redux/slices/admin/userSlice'
import { AppDispatch } from '@/redux/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './components/UserCard'

const UserManagement = () => {
    const users = useSelector(selectAllUsers)
    const status = useSelector(userStatus)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers({ limit: 10, page: 1 }))
        }
    }, [users, dispatch])

    const handleDelete = () => {}
    return (
        <div>
            <div className="mb-10 pl-5">
                <Sheet>
                    <SheetTrigger className={`button ${buttonVariants()}`}>
                        Add New User
                    </SheetTrigger>
                    <SheetContent side={'bottom'}>
                        <h2>Fill up</h2>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="ml-20 w-1/2">
                {users &&
                    users.map((user) => {
                        return (
                            <UserCard
                                key={user._id}
                                user={user}
                                handleDelete={handleDelete}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

export default UserManagement
