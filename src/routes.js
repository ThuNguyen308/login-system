import Customers from "./pages/Customers"
import Profile from "./pages/Profile"
import Logout from "./pages/Logout"
import Login from "./pages/Login"
import ResetPassword from "./pages/ResetPassword"
import Register from "./pages/Register"
import DefaultLayout from "./components/layouts/DefaultLayout"
import Protected from "./components/Protected"

const routes = [
    { path: "/", element: <Login />},
    { path: "/login", element: <Login />},
    { path: "/register", element: <Register />},
    { path: "/reset-password", element: <ResetPassword />},
    { path: "/profile", element: <Protected><DefaultLayout><Profile /></DefaultLayout></Protected>},
    { path: "/logout", element: <Protected><DefaultLayout><Logout /></DefaultLayout></Protected>},
    { path: "/customers", element: <Protected><DefaultLayout><Customers /></DefaultLayout></Protected>},
]

export default routes