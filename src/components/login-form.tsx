import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useState, type FormEvent } from "react"
import type { User } from "@/utils/types"
import { ModeToggle } from "./mode-toggle"
import { GoogleAuthButton } from "./ui/GoogleAuthButton"
import { GithubAuthButton } from "./ui/GithubAuthButton"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { loginUser } from "@/slice/authSlice"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { AnimatePresence, motion } from "framer-motion"
import type { RootState } from "@/store"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const auth = useAppSelector((state: RootState) => state.auth)
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState<User>({
    email: "",
    password: ""
  })
  const nav = useNavigate()
  const dispatch = useAppDispatch()



  const handleLogin = async (e: FormEvent) => {
    try {
      e.preventDefault()
      const res = await dispatch(loginUser(user)).unwrap(); // wait for backend response

      toast.success(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      setUser({
        email: "",
        password: "",
        name: "",
        title: ""
      });
      nav("/dashboard")
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <ModeToggle />
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {
            auth.loading &&
            <div className="bg-black/10 flex justify-center items-center backdrop-blur-xs h-full absolute inset-0 z-40 w-1/2">
              <Loader2 className="animate-spin size-30 text-sky-600" />
            </div>
          }
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex items-center text-center gap-2 justify-center">
                  <img src="/imgs/logo.png" alt="Logo" className="size-10" />
                  <h1 className="text-3xl font-bold text-sky-600">Taskify</h1>
                </div>
                <p className="text-muted-foreground text-balance">
                  Login to your <b>Taskify</b> account
                </p>
              </div>
              <div className="grid gap-3">
                <Label
                  className="text-sky-700"
                  htmlFor="email">Email</Label>
                <Input
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="border-sky-600 focus:!ring-sky-500/40 focus:border-transparent"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <AnimatePresence>
                  {
                    auth.error?.toLocaleLowerCase()?.includes("email") &&
                    <motion.small
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: .3 }}
                      className="text-xs text-red-600 mt-1 ml-1 capitalize font-medium">
                      {auth.error}
                    </motion.small>
                  }
                </AnimatePresence>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label
                    className="text-sky-700"
                    htmlFor="password">Password</Label>
                </div>
                <div className="relative flex items-center">
                  <Input
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="border-sky-600 focus:!ring-sky-500/40 focus:border-transparent"
                    id="password" type={showPassword ? "text" : "password"} required />
                  <Button type="button" variant={"link"} onClick={() => setShowPassword(prev => !prev)} className="absolute right-0 cursor-pointer z-50 focus:!ring-0">
                    {showPassword ?
                      <EyeOff className="size-4.5 text-sky-900" />
                      :
                      <Eye className="size-4.5 text-sky-900" />
                    }
                  </Button>
                </div>
                <AnimatePresence>
                  {
                    auth.error && !["email"].some(field => auth.error?.toLowerCase().includes(field)) &&
                    <motion.small
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: .3 }}
                      className="text-xs text-red-600 mt-1 ml-1 capitalize font-medium">
                      {auth.error}
                    </motion.small>
                  }
                </AnimatePresence>
              </div>
              <Button type="submit" className="w-full bg-sky-700 hover:bg-sky-800 duration-300">
                Login
              </Button>
              <div className=" relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-sky-700">
                <span className="bg-card relative z-10 px-2 text-sky-700">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <GoogleAuthButton mode="login" />
                <GithubAuthButton />
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7] "
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link to="#">Terms of Service</Link>{" "}
        and <Link to="#">Privacy Policy</Link>.
      </div>
    </div>
  )
}
