import { Outlet } from 'react-router-dom'
import AppNavbar from './AppNavbar'

function HomeLayout() {
    return (
        <div className="h-[100vh]">
            <AppNavbar />
            <Outlet />
        </div>
    )
}

export default HomeLayout
