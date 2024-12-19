
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ProFile from './components/ProFile'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react'
import { auth } from './utils/firebase'

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });


  return (
    <>
      {/* <h1>Lorem Ipsum dolor sit amet.</h1> */}
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Router>
              <Routes>
              <Route
                  path="/"
                  element={user ? <Navigate to="/profile" /> : <Login />}
                ></Route>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/Register" element={<Register />}></Route>
                <Route path="ProFile" element={<ProFile />}></Route>
              </Routes>
              <ToastContainer />
            </Router>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
