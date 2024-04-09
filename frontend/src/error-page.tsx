import { Link, useNavigate, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error: any = useRouteError()
    console.log(error)
    const navigate = useNavigate()

    return (
        <div
            id="error-page"
            className="flex min-h-[100vh] flex-col items-center justify-center space-y-4 px-4 text-center md:px-6"
        >
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    404 - Page Not Found
                </h1>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We looked everywhere, but we couldn't find the page you were
                    looking for.
                </p>
            </div>
            <Link
                to={'/'}
                onClick={() => navigate(-1)}
                className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            >
                Return to the website
            </Link>
        </div>
    )
}
