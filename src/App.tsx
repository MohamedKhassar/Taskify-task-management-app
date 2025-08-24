import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./Providers/theme-provider";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { useEffect } from "react";
import { clearError, loadUserFromStorage } from "./slice/authSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // whenever route changes, reset error and reload user from storage
    dispatch(clearError());
    dispatch(loadUserFromStorage());
  }, [location, dispatch]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        {user ? (
          // Routes when logged in
          <Route element={<Layout />}>
            <Route path="/dashboard">
              <Route index element={<h1>{user.name}</h1>} />
              <Route path="tasks">
                <Route index element={<h1>tasks</h1>} />
                <Route path="completed" element={<h1>completed</h1>} />
                <Route path="in-progress" element={<h1>in progress</h1>} />
                <Route path="todo" element={<h1>todo</h1>} />
              </Route>
              <Route path="team" element={<h1>team</h1>} />
              <Route path="trash" element={<h1>trash</h1>} />
            </Route>

            {/* Block access to auth pages */}
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            <Route path="/register" element={<Navigate to="/dashboard" replace />} />
          </Route>
        ) : (
          // Routes when not logged in
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Block access to dashboard */}
            <Route path="/dashboard/*" element={<Navigate to="/login" replace />} />
          </>
        )}

        {/* Default route */}
        <Route
          path="/"
          element={
            <Navigate to={user ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
