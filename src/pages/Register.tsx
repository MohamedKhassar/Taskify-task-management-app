import PageTitle from "@/components/PageTitle"
import { SignupForm } from "@/components/signup-form"

const Register = () => {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 h-screen">
            <PageTitle title="Sign-up" />
            <div className="w-full max-w-sm md:max-w-3xl">
                <SignupForm />
            </div>
        </div>
    )
}

export default Register