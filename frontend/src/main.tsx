import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../app/globals.css'
import { ThemeProvider } from './contexts/theme/ThemeProvider.tsx'
import ErrorPage from './error-page.tsx'
import AdminLayout from './layouts/AdminLayout.tsx'
import HomeLayout from './layouts/HomeLayout.tsx'
import UserFlowLayout from './layouts/UserFlowLayout.tsx'
import About from './pages/About.tsx'
import Blogs from './pages/admin/Blogs.tsx'
import Dashboard from './pages/admin/Dashboard.tsx'
import Users from './pages/admin/Users.tsx'
import User from './pages/User.tsx'
import ForgotPassword from './pages/userflow/ForgotPassword.tsx'
import Login from './pages/userflow/Login.tsx'
import Register from './pages/userflow/Register.tsx'
import VerifyEmail from './pages/userflow/VerifyEmail.tsx'
import VerifyPasswordToken from './pages/userflow/VerifyPasswordToken.tsx'

const adminChildren = [
    { index: true, element: <Dashboard /> },
    { path: 'blogs', element: <Blogs /> },
    { path: 'users', element: <Users /> },
]

const userFlowChildren = [
    { element: <User />, index: true },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'forgot-password', element: <ForgotPassword /> },
    { path: 'verify-password-token', element: <VerifyPasswordToken /> },
    { path: 'verify-email', element: <VerifyEmail /> },
]

const homeChildren = [
    { path: 'about', element: <About /> },
    { path: 'user', element: <UserFlowLayout />, children: userFlowChildren },
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        children: homeChildren,
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: adminChildren,
        errorElement: <ErrorPage />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
)
