import { Link, useLocation } from "react-router-dom"
import { cn } from "../utils/cn"
import { sidebarItems } from "../utils/data"

const Sidebar = () => {
    const { pathname } = useLocation()
    return (
        <aside className="h-screen  w-80 sticky top-0 py-10 px-6 dark:bg-muted space-y-15">
            <Link to="/dashboard" className="flex items-center text-center gap-2">
                <img src="/imgs/logo.png" alt="Logo" className="size-8" />
                <h1 className="text-2xl font-bold text-sky-600">Taskify</h1>
            </Link>
            <div className="space-y-3">
                {
                    sidebarItems.map(({ Icon, ...item }, index) => (
                        <Link to={"/dashboard" + item.path} key={index} className={cn("flex items-center gap-2 py-2.5 px-4  rounded-md cursor-pointer duration-300",
                            (pathname === "/dashboard"+item.path&&item.label!="Trash") ? "bg-sky-200" :(pathname === "/dashboard"+item.path&&item.label=="Trash")?"bg-red-200": "hover:bg-sky-100",
                            item.label=="Trash"? "hover:bg-red-100 text-red-600" : "text-sky-800"
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