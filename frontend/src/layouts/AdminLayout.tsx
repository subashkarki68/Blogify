import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'

function AdminLayout() {
    const [backBlur, setBackBlur] = useState(false)

    const blurClasses = 'blur-sm'

    const blurToggle = () => {
        return setBackBlur((prev) => !prev)
    }

    return (
        <div className="flex h-[100vh] w-[100vw] bg-gradient-to-r from-indigo-800 to-indigo-500 text-amber-400">
            <AdminSidebar className={`${backBlur ? blurClasses : ''}`} />
            <div>
                <AdminNavbar blurToggle={blurToggle} />
                <div className={backBlur ? blurClasses : ''}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
