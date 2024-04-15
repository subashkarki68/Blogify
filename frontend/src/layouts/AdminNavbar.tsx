function AdminNavbar({
    blurToggle,
    className = '',
}: {
    blurToggle: () => void
    className?: string
}) {
    return (
        <nav
            className={`flex w-[100vw] -translate-x-36 items-center justify-center px-10 py-10 ${className}`}
        >
            <div className="w-[33%] pt-2 text-gray-600">
                <input
                    className="h-10 w-full rounded-full bg-slate-800 px-5 pr-12 text-sm text-white transition-all duration-700 placeholder:text-gray-400 focus:scale-150 focus:outline-none focus-visible:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search..."
                    onFocus={blurToggle}
                    onBlur={blurToggle}
                />
                {/* <button
                    type="submit"
                    className="absolute right-0 top-0 z-10 mr-4 mt-5"
                >
                    <SearchIcon className="h-4 w-4 text-white" />
                </button> */}
            </div>
        </nav>
    )
}

export default AdminNavbar
