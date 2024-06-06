import { Outlet } from 'react-router-dom'

function UserFlowLayout() {
    return (
        <div className="m-auto min-h-full w-[80%]">
            <Outlet />
        </div>
    )
}

export default UserFlowLayout
