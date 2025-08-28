import { Outlet, Navigate } from "react-router-dom"
import type { User } from "./types"

const ProtectedRoutes = ({ user }: { user: User | null }) => {

    return user ? <Outlet /> : <Navigate to={"/login"} replace />
}

export default ProtectedRoutes