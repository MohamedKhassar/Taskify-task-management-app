import { LoginForm } from "@/components/login-form"
import PageTitle from "@/components/PageTitle"

const Login = () => {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 h-screen">
            <PageTitle title="Login" />
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm />
            </div>
        </div>
    )
}

export default Login