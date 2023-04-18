import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { ConfigProvider } from 'antd';
import routes from "./routes";
import { useDispatch } from 'react-redux';
import { updateSuccess } from './redux/actions/auth';

function App() {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const token = window.localStorage.getItem("accessToken")
  useEffect(() => {
    const fetchUserData = () => {
      fetch("http://localhost:5000/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "token": `Bearer ${localStorage.getItem("accessToken")}`
                },
            body: JSON.stringify({
                token: window.localStorage.getItem("accessToken")
            })
            }).then(res => res.json())
            .then((data) => {
                dispatch(updateSuccess(data.data))
        })
    }
    if (token && !currentUser._id) {
      fetchUserData()
    }
  }, [dispatch, currentUser]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'pink',
          fontFamily: "'Poppins', sans-serif"
        }
      }}
    >
      <Router>
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
