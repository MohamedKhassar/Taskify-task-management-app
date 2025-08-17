import { SelectTitle } from '@/components/SelectTitle'
import Auth from '../components/Auth'

const Register = () => {
    return (
        <Auth title="Create an account">
            <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-sky-800">Full Name</label>
                    <input type="text" id="name" className="mt-1 duration-300 block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" placeholder="Enter your name" required minLength={3} />
                </div>
                <div>
                    <label htmlFor="user-title" className="block text-sm font-medium text-sky-800">Title</label>
<SelectTitle/>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-sky-800">Email</label>
                    <input type="email" id="email" className="mt-1 duration-300 block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" placeholder="Enter your email" required />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-sky-800">Password</label>
                    <input type="password" id="password" className="mt-1 duration-300 block w-full px-3 py-2 border border-sky-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-300">
                    Login
                </button>
            </form>
        </Auth>
    )
}

export default Register