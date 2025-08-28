import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./Providers/theme-provider";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { useEffect } from "react";
import { clearError, loadUserFromStorage } from "./slice/authSlice";
import Dashboard from "./layout/Dashboard";
import Tasks from "./layout/Tasks";

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // whenever route changes, reset error and reload user from storage
    dispatch(clearError());
    dispatch(loadUserFromStorage());
  }, [location, dispatch]);

  if (loading) {
    // While checking cookie / local storage, show a loader or blank page
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        {user ? (
          <Route element={<Layout />}>
            <Route path="/dashboard/*">
              <Route index element={<Dashboard />} />
              <Route path="tasks">
                <Route index element={<Tasks />} />
                <Route path="completed" element={<h1>completed</h1>} />
                <Route path="in-progress" element={<h1>in progress</h1>} />
                <Route path="todo" element={<h1>todo</h1>} />
              </Route>
              <Route path="team" element={<h1>team</h1>} />
              <Route path="trash" element={<h1>trash</h1>} />
            </Route>

            <Route path="/login" element={<Navigate replace to="/dashboard" />} />
            <Route path="/register" element={<Navigate replace to="/dashboard" />} />
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Navigate replace to="/login" />} />
          </>
        )}

        <Route path="/" element={<Navigate replace to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </ThemeProvider>

  );
};

export default App;
