import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { fetchUsers, selectAllUsers } from '@/redux/slices/admin/userSlice'
import { AppDispatch } from '@/redux/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './components/UserCard'

const UserManagement = () => {
    const users = useSelector(selectAllUsers)
    const dispatch: AppDispatch = useDispatch()

    const test = {
        name: 'Subash',
        roles: ['admin', 'user'],
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers({ limit: 10, page: 1 }))
            console.log('fetching users', users)
        }
    }, [users, dispatch])

    console.log('USER MGNT', users)

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
                <UserCard user={test} handleDelete={handleDelete} />
            </div>
        </div>
    )
}

export default UserManagement
