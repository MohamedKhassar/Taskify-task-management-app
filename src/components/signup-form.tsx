import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Github } from "lucide-react"
import { useState } from "react"
import { SelectTitle } from "./SelectTitle"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  console.log(showPassword)
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
                <SelectTitle />
              </div>
              <div className="grid gap-3">
                <Label
                  className="text-sky-700"
                  htmlFor="email">Email</Label>
                <Input
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
                    className="border-sky-600 focus:!ring-sky-500/40 focus:border-transparent"
                    id="password" type={showPassword ? "text" : "password"} required />
                  <Button type="button" variant={"link"} onClick={() => setShowPassword(prev=>!prev)} className="absolute right-0 cursor-pointer z-50 focus:!ring-0">
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
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Signup with Google</span>
                </Button>
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
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
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
