import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { sidebarItems } from "../utils/data"

const Sidebar = () => {
    const { pathname } = useLocation()
    return (
        <aside className="h-screen lg:block hidden lg:w-80 md:w-100 sticky top-0 py-10 px-6 dark:bg-dark bg-light space-y-8  !duration-300 !transition-colors border-r">
            <Link to="/dashboard" className="flex items-center text-center gap-2 border-b dark:border-sky-600 border-sky-700 pb-6">
                <img src="/imgs/logo.png" alt="Logo" className="size-8" />
                <h1 className="text-2xl font-bold text-sky-600">Taskify</h1>
            </Link>
            <div className="space-y-3">
                {
                    sidebarItems.map(({ Icon, ...item }, index) => (
                        <Link to={"/dashboard" + item.path} key={index} className={cn("flex items-center gap-2 py-2.5 px-4  rounded-md cursor-pointer duration-300",
                            (pathname == "/dashboard" + item.path && item.label != "Trash") ? "bg-sky-200 dark:bg-sky-800" : (pathname === "/dashboard" + item.path && item.label == "Trash") ? "bg-red-200 dark:bg-red-300" : "hover:bg-sky-100 dark:hover:bg-sky-600",
                            item.label == "Trash" ? "hover:bg-red-100 dark:hover:bg-red-200 text-red-600" : "dark:text-sky-200 text-sky-800"
                        )}>
                            <Icon className="size-4" />
                            <h1 className="font-medium">{item.label}</h1>
                        </Link>
                    ))
                }
            </div>
            <small className="text-center text-xs text-sky-800 place-content-end bottom-5 absolute">
                <p>© {new Date().getFullYear()} Taskify. All rights reserved.</p>
                <p>Made with ❤️ by <Link target="_blank" to="https://mohamed-khassar.vercel.app/" className="font-bold">Mohamed Khassar</Link></p>
            </small>
        </aside>
    )
}

export default Sidebar