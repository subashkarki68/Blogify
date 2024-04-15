import { useAuthContext } from '@/context/AuthProvider'
import { findUserShortName } from '@/utils/users'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { BookIcon, ChevronDown, HomeIcon, Link, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function AdminSidebar({ className }: { className: string }) {
    const { user, logout } = useAuthContext()
    const navigate = useNavigate()

    const liClasses =
        'flex h-[100%] items-center gap-2 px-10 py-4 hover:cursor-pointer hover:bg-amber-400 hover:text-indigo-600'

    const userShortName = findUserShortName(
        user?.fName || 'A',
        user?.lName || 'N',
    )

    const handleLinks = {
        login: () => navigate('/user/login'),
    }

    return (
        <aside
            className={`fixed h-[100vh] w-[250px] bg-gradient-to-r from-violet-800 to-indigo-800 ${className ?? ''}`}
        >
            <div className="mb-16 flex flex-col">
                <header className="flex gap-5 p-10">
                    <BookIcon className="h-10 w-10" />
                    <div>
                        <h2 className="text-2xl">Admin</h2>
                        <p>Dashboard System</p>
                    </div>
                </header>
            </div>
            <ul className="flex flex-col justify-between">
                <li className={liClasses}>
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                </li>
                <li
                    className={liClasses}
                    onClick={() => navigate('/admin/blogs')}
                >
                    <HomeIcon className="h-4 w-4" />
                    Blogs
                </li>
                <li className={liClasses}>
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                </li>
                <li className={liClasses}>
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                </li>
                <li className={liClasses}>
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                </li>
                <li className={liClasses}>
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                </li>
                <li className={liClasses}>
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                </li>
            </ul>
            <div className="w-full">
                <DropdownMenu>
                    <DropdownMenuTrigger className="w-full focus-visible:outline-none">
                        <div className="border-1 flex w-full flex-row items-center gap-1 rounded-lg border-gray-200 p-3 shadow-md hover:border-gray-500 hover:shadow-lg dark:text-gray-400 dark:hover:text-white">
                            <UserRound className="h-6 w-6" />
                            <span>{userShortName}</span>
                            <ChevronDown />
                        </div>
                        {/* <CircleUserIcon className="h-8 w-8" /> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[180px] bg-primary px-5 py-2">
                        <DropdownMenuLabel>My Account:</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to={'/user'}>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        {user.userId && (
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={logout}
                            >
                                Logout
                            </DropdownMenuItem>
                        )}
                        {!user.userId && (
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={handleLinks.login}
                            >
                                Login
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>
    )
}

export default AdminSidebar
