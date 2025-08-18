import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Github } from "lucide-react"
import { useState } from "react"
import { SearchableSelect } from "./SelectTitle"
import { type User } from "@/utils/types"
import { ModeToggle } from "./mode-toggle"
import { GoogleAuthButton } from "./ui/GoogleAuthButton"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState<User>({
    name: "",
    title: "",
    email: "",
    password: ""
  })
  console.log(user)
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <ModeToggle />
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="flex items-center text-center gap-2 justify-center">
                  <img src="/imgs/logo.png" alt="Logo" className="size-10" />
                  <h1 className="text-3xl font-bold text-sky-600">Taskify</h1>
                </div>
                <p className="text-muted-foreground text-balance">
                  Create your <b>Taskify</b> account
                </p>
              </div>
              <div className="grid gap-3">
                <Label
                  className="text-sky-700"
                  htmlFor="name">Full Name</Label>
                <Input
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="border-sky-600 focus:!ring-sky-500/40 focus:border-transparent"
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label
                  className="text-sky-700"
                  htmlFor="title">Title</Label>
                <SearchableSelect selectedTitle={user.title} setSelectedTitle={(value) => setUser({ ...user, title: value })} />
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
              </div>
              <Button type="submit" className="w-full bg-sky-700 hover:bg-sky-800 duration-300">
                Signup
              </Button>
              <div className=" relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-sky-700">
                <span className="bg-card relative z-10 px-2 text-sky-700">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <GoogleAuthButton mode="register" />
                <Button variant="outline" type="button" className="w-full">
                  <Github className="size-5 fill-black" />
                  <span className="sr-only">Signup with Github</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
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
