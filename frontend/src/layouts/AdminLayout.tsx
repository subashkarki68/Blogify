import { useAuthContext } from '@/context/AuthProvider'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'

function AdminLayout() {
    const [backBlur, setBackBlur] = useState(false)
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const blurClasses = 'blur-sm'
    let adminContent
    const blurToggle = () => {
        return setBackBlur((prev) => !prev)
    }

    useEffect(() => {
        if (!user.roles.includes('admin')) navigate('/')
    }, [])

    if (user.roles.includes('admin')) {
        adminContent = (
            //TODO: when there is no border there is small whitespace in bottom
            <div className="min-h-[100vh] w-[100vw] border border-black bg-gradient-to-r from-indigo-800 to-indigo-500 text-amber-400">
                <AdminSidebar className={`${backBlur ? blurClasses : ''}`} />
                <div>
                    <AdminNavbar blurToggle={blurToggle} className="ml-[250]" />
                    <div
                        className={`ml-[250px] ${backBlur ? blurClasses : ''}`}
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        )
    }

    return <>{adminContent}</>
}

export default AdminLayout
