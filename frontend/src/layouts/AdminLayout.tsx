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
        //TODO: when there is no border there is small whitespace in bottom
        <div className="min-h-[100vh] w-[100vw] bg-gradient-to-r from-indigo-800 to-indigo-500 text-amber-400">
            <AdminSidebar className={`${backBlur ? blurClasses : ''}`} />
            <div>
                <AdminNavbar blurToggle={blurToggle} className="ml-[250]" />
                <div className={`ml-[250px] ${backBlur ? blurClasses : ''}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
