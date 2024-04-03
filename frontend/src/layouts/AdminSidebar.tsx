import { BookIcon, HomeIcon } from 'lucide-react'

function AdminSidebar({ className }: { className: string }) {
    const liClasses =
        'flex h-[100%] items-center gap-2 px-10 py-4 hover:cursor-pointer hover:bg-amber-400 hover:text-indigo-600'
    return (
        <aside
            className={`h-[100vh] max-h-[100vh] w-[20%] bg-gradient-to-r from-violet-800 to-indigo-800 ${className ?? ''}`}
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
                <li className={liClasses}>
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                </li>
            </ul>
        </aside>
    )
}

export default AdminSidebar
