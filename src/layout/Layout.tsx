import Sidebar from "./Sidebar"
import { Outlet, useLocation } from "react-router-dom"
import SmallSidebar from "./SmallSidebar"
import Navbar from "./Navbar"
import { useAppDispatch } from "@/hooks/redux"
import { useEffect } from "react"
import { fetchTasks } from "@/slice/taskSlice"

const Layout = () => {
    const dispatch = useAppDispatch()

    const { pathname } = useLocation()

    useEffect(() => {
        const getData = async () => {
            await dispatch(fetchTasks())
        }
        getData()
    }, [dispatch, pathname])
    return (
        <main className="md:flex w-full justify-stretch">
            <Sidebar />
            <SmallSidebar />
            <section className="flex flex-col w-full md:px-10 md:py-5 px-5 py-10 justify-start">
                <Navbar />
                <div className="w-full">
                    <Outlet />
                </div>
            </section>
        </main>
    )
}

export default Layout