import Search from '@/components/Search'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuthContext } from '@/context/AuthProvider'
import { ModeToggle } from '@/contexts/theme/ModeToggle'
import { findUserShortName } from '@/utils/users'
import {
    ChevronDown,
    LucideBook,
    MenuIcon,
    SearchIcon,
    UserRound,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AppNavbar() {
    const [userShortName, setUserShortName] = useState('')
    const { user, logout } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        setUserShortName(
            findUserShortName(user?.fName || '', user?.lName || ''),
        )
    }, [user])
    // const handleLinks = {
    //     login: () => navigate('/user/login'),
    // }

    return (
        <header className="mb-8 flex w-full shrink-0 justify-between border-b-2 p-2 shadow-lg">
            {/* For Small Screens */}
            <div className="flex w-full items-center justify-between md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <div className="md:hidden">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </div>
                    </SheetTrigger>
                    <SheetContent side={'top'}>
                        <div className="grid gap-4 py-4">
                            <div className="flex w-full items-center space-x-2 rounded-lg py-4">
                                <Input
                                    className="flex-1"
                                    placeholder="Search..."
                                    type="search"
                                />
                                <Button
                                    size="sm"
                                    type="submit"
                                    variant="outline"
                                >
                                    <SearchIcon className="h-4 w-4" />
                                    <span className="sr-only">Search</span>
                                </Button>
                            </div>
                            <Link to={'/'}>Home</Link>
                            <Link to={'/about'}>About</Link>
                            <Link to={'/user/login'}>Login</Link>
                            <Link to={'/user/register'}>Register</Link>
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex gap-8">
                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus-visible:outline-none">
                            <div className="border-1 flex flex-row items-center gap-1 rounded-lg border-gray-200 p-3 text-gray-500 shadow-md hover:border-gray-500 hover:shadow-lg dark:text-gray-400 dark:hover:text-white">
                                <UserRound className="h-6 w-6" />
                                <span>{''}</span>
                                <ChevronDown />
                            </div>
                            {/* <CircleUserIcon className="h-8 w-8" /> */}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account:</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to={'/user'}>Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <nav className="hidden w-[100vw] justify-between gap-6 md:flex">
                {/* For Medium and larger screen */}
                <Link
                    to={'/'}
                    className="hidden  items-center  md:flex md:gap-2"
                >
                    <LucideBook className="h-6 w-6" />
                    <span className="sr-only">Blogify</span>
                    <div className="hidden text-2xl font-semibold sm:block">
                        Blogify
                    </div>
                </Link>
                <div className="flex w-full items-center space-x-2 rounded-lg py-4 md:max-w-sm">
                    <Search />
                </div>
                <div className="flex items-center gap-4">
                    <ul className="mr-5 flex gap-4">
                        <Link to={'/'}>Home</Link>
                        <Link to={'/about'}>About</Link>
                        {user?.roles?.includes('admin') && (
                            <Link to={'/admin'}>Admin</Link>
                        )}
                    </ul>
                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="focus-visible:outline-none">
                            <div className="border-1 flex flex-row items-center gap-1 rounded-lg border-gray-200 p-3 text-gray-500 shadow-md hover:border-gray-500 hover:shadow-lg dark:text-gray-400 dark:hover:text-white">
                                <UserRound className="h-6 w-6" />
                                <span>{userShortName}</span>
                                <ChevronDown />
                            </div>
                            {/* <CircleUserIcon className="h-8 w-8" /> */}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Account Menu:</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {!user.userId && (
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link to={'/user/login'}>Login</Link>
                                </DropdownMenuItem>
                            )}
                            {!user.userId && (
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link to={'/user/register'}>Register</Link>
                                </DropdownMenuItem>
                            )}
                            {user.userId && (
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link to={'/user'}>My Profile</Link>
                                </DropdownMenuItem>
                            )}
                            {user.userId && (
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link to={'/bookmarks'}>Bookmarks</Link>
                                </DropdownMenuItem>
                            )}
                            {user.userId && (
                                <DropdownMenuItem
                                    onClick={logout}
                                    className="cursor-pointer"
                                >
                                    Logout
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    )
}

export default AppNavbar
