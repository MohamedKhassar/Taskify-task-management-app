import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { ThemeProvider } from "./Providers/theme-provider"

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        {/* Dashboard routes use the Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard">
            {/* index = default child for /dashboard */}
            <Route index element={<h1>dashboard</h1>} />
            <Route path="tasks">
              <Route index element={<h1>tasks</h1>} />
              <Route path="completed" element={<h1>completed</h1>} />
              <Route path="in-progress" element={<h1>in progress</h1>} />
              <Route path="todo" element={<h1>todo</h1>} />
            </Route>

            <Route path="team" element={<h1>team</h1>} />
            <Route path="trash" element={<h1>trash</h1>} />
          </Route>
        </Route>

        {/* Catch-all for other routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App