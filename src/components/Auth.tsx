import React, { type ReactNode } from 'react'
import SSOBtn from './SSOBtn'
import { Link, useLocation } from 'react-router-dom'

const Auth = ({ children, title }: { children: ReactNode, title: string }) => {
    const { pathname } = useLocation()
    return (
        <main className="flex items-center justify-center h-screen">
            <section className="md:mx-auto mx-4 w-md px-6 py-9 border border-sky-200 rounded-2xl bg-white shadow-lg space-y-4">
                <div className="flex items-center text-center gap-2 justify-center">
                    <img src="/imgs/logo.png" alt="Logo" className="size-10" />
                    <h1 className="text-3xl font-bold text-sky-600">Taskify</h1>
                </div>
                <div className="space-y-4">
                    <h2 className="text-center text-xl font-semibold text-sky-800">{title}</h2>
                    {children}
                    <div className="relative flex items-center justify-center text-sky-800 font-bold">
                        <span className="capitalize bg-white z-50 px-2">or</span>
                        <hr className="absolute w-full" />
                    </div>
                    <SSOBtn />
                    <small className="text-sky-600">
                        {
                            pathname === '/login' ? <>Don\'t have an account? <Link to="/register" className="font-semibold hover:underline">Register here</Link></> : <>Already have an account? <Link to="/login" className="font-semibold hover:underline capitalize">login here</Link></>
                        }
                    </small>
                </div>
            </section>
        </main>
    )
}

export default Auth