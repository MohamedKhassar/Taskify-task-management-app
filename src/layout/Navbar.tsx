import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/slice/authSlice";
import type { RootState } from "@/store";
import { sidebarItems } from "@/utils/data";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation()

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-Poppins text-sky-800 dark:text-sky-600">{sidebarItems.find(item => pathname == "/dashboard" + item.path)?.label}</h1>
        <section className="py-3 flex items-center gap-4">
          {/* Theme toggle */}
          <ModeToggle className="!static" />

          {/* Notifications dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className="rounded-xl relative size-4 !p-4 hover:!bg-red-50/80 hover:text-red-900 duration-300"
              >
                <span className="absolute text-xs top-1 right-2 bg-red-800 z-30 rounded-full size-2 flex justify-center items-center"></span>
                <span className="absolute text-xs top-1 right-2 bg-red-500 animate-ping z-0 rounded-full size-2 flex justify-center items-center"></span>
                <Bell className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>You have 3 new tasks</DropdownMenuItem>
              <DropdownMenuItem>Team meeting at 4:00 PM</DropdownMenuItem>
              <DropdownMenuItem>Your profile was updated</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


          {/* User Dropdown */}
          <nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="rounded-full md:size-12 size-9 cursor-pointer hover:ring-2 hover:!ring-sky-500/70 duration-300">
                <img src={user?.avatar + "&size=300"} alt="" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:!bg-body bg-white">
                <DropdownMenuLabel>Hi, {user?.name?.split(" ")[0]}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")} className="hover:bg-sky-50 my-2 text-sky-800 dark:text-sky-200 dark:hover:bg-sky-800 duration-300 cursor-pointer">
                  <User className="size-4 text-sky-800 dark:text-sky-200" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile/edit")} className="hover:bg-sky-50 my-2 text-sky-800 dark:text-sky-200 dark:hover:bg-sky-800 duration-300 cursor-pointer">
                  <Settings className="size-4 text-sky-800 dark:text-sky-200" /> Edit Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="font-semibold text-red-900 cursor-pointer bg-red-100 hover:bg-red-200 focus:bg-red-300 focus:text-red-900">
                  <LogOut className="size-4 text-red-900" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </section>
      </header>
      <DropdownMenuSeparator className="bg-sky-700 dark:bg-sky-600" />
    </>
  );
};

export default Navbar