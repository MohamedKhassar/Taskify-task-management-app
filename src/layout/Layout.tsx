import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="flex w-full justify-stretch">
            <Sidebar />
            <section className="grid grid-cols-1 w-full">
                <Navbar />
                <div className="h-screen w-full">
                    <Outlet />
                </div>
            </section>
        </main>
    )
}

export default Layout