import { Outlet } from 'react-router-dom'

function UserFlowLayout() {
    return (
        <div className="flex h-[80%] w-full items-center justify-center">
            <Outlet />
        </div>
    )
}

export default UserFlowLayout
