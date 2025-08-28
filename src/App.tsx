import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./Providers/theme-provider";

import Dashboard from "./layout/Dashboard";
import Tasks from "./layout/Tasks";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useAppDispatch } from "./hooks/redux";
import { useEffect } from "react";
import { clearError, loadUserFromStorage } from "./slice/authSlice";
import { useAppSelector } from "@/hooks/redux";

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  console.log(user)
  useEffect(() => {
    dispatch(clearError());
    dispatch(loadUserFromStorage());
  }, [location, dispatch]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        {!user && (
          <>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Navigate to={"/login"}/>} path="/" />
          </>
        )}

        {user && (
          <Route element={<ProtectedRoutes user={user} />}>
            <Route element={<Navigate to={"/dashboard"}/>} path="/" />
            <Route element={<Navigate to={"/dashboard"} />} path="/login" />
            <Route element={<Navigate to={"/dashboard"} />} path="/register" />
            <Route path="/dashboard/*" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="tasks">
              <Route index element={<Tasks />} />
              <Route path="completed" element={<h1>completed</h1>} />
              <Route path="In-Progress" element={<h1>In Progress</h1>} />
              <Route path="ToDo" element={<h1>To Do</h1>} />
              </Route>
              <Route path="team" element={<h1>team</h1>} />
              <Route path="trash" element={<h1>trash</h1>} />
            </Route>
          </Route>
        )}
      </Routes>

    </ThemeProvider>

  );
};

export default App;
