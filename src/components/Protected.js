import Login from "../pages/Login";

function Protected({ children }) {
    const auth = localStorage.getItem("accessToken")
    return ((auth) ? children : <Login />)
}

export default Protected;