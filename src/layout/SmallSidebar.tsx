import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, SidebarOpen, X } from "lucide-react"
import { sidebarItems } from "../utils/data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const SmallSidebar = () => {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden relative">
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="p-2 z-50 dark:bg-sky-800 dark:text-sky-200 rounded-l-none fixed top-8"
      >
        <SidebarOpen className="size-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              drag="x"
              dragConstraints={{ left: -250, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                // if user swipes left quickly -> close
                if (info.offset.x < -100 || info.velocity.x < -500) {
                  setIsOpen(false)
                }
              }}
              className="fixed top-0 left-0 h-full w-64 z-50 dark:bg-dark bg-light p-6 space-y-8 shadow-lg"
            >
              {/* Logo */}
              <Link to="/dashboard" className="flex items-center gap-2">
                <img src="/imgs/logo.png" alt="Logo" className="size-8" />
                <h1 className="text-2xl font-bold text-sky-600">Taskify</h1>
              </Link>

              <hr className="dark:border-sky-700 border-sky-900" />

              {/* Sidebar Items */}
              <div className="space-y-3">
                {sidebarItems.map(({ Icon, ...item }, index) => (
                  <Link
                    to={"/dashboard" + item.path}
                    key={index}
                    onClick={() => setIsOpen(false)} // close sidebar when clicking
                    className={cn(
                      "flex items-center gap-2 py-2.5 px-4 rounded-md cursor-pointer duration-300",
                      pathname === "/dashboard" + item.path && item.label !== "Trash"
                        ? "bg-sky-200 dark:bg-sky-800"
                        : pathname === "/dashboard" + item.path && item.label === "Trash"
                        ? "bg-red-200 dark:bg-red-300"
                        : "hover:bg-sky-100 dark:hover:bg-sky-600",
                      item.label === "Trash"
                        ? "hover:bg-red-100 dark:hover:bg-red-200 text-red-600"
                        : "dark:text-sky-200 text-sky-800"
                    )}
                  >
                    <Icon className="size-4" />
                    <h1 className="font-medium">{item.label}</h1>
                  </Link>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SmallSidebar
