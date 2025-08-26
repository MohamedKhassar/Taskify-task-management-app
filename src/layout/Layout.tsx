import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import SmallSidebar from "./SmallSidebar"
import Navbar from "./Navbar"

const Layout = () => {
    return (
        <main className="md:flex w-full justify-stretch">
            <Sidebar />
            <SmallSidebar />
            <section className="flex flex-col w-full px-10 py-5 justify-start">
                <Navbar />
                <div className="w-full">
                    <Outlet />
                </div>
            </section>
        </main>
    )
}

export default Layout