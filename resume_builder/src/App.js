import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/homepage";
import About from "./pages/about";
import Contact from "./pages/contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserDetails from "./pages/UserDetails";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ForgetPassword from "./pages/ForgetPassword";
import Alert from "./components/Alert";
import AddTemplates from "./components/AddTemplates";
import Users from "./components/Users";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isadmin, setIsAdmin] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (message,type) =>{
    setAlert({
      message: message,
      type: type,
    })
    setTimeout(()=> {
      setAlert(null);
    },2000);
  }

  const togglelogin =()=>{
    if (!isLoggedIn){
        setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
}
const toggleadmin =()=>{
  if (!isadmin){
      setIsAdmin(true)
  }else{
    setIsAdmin(false)
  }
}
  // const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className="App">
      <Router>
      <Navbar isLoggedIn={isLoggedIn} showAlert={showAlert}/>
      <Alert  alert={alert}/>
      {/* {isadmin ? (  <AdminDrawer/>):
      (<></>)
      } */}
      {/* {console.log(isLoggedIn)} */}
      <Routes>
        <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/SignIn" element={<SignIn togglelogin={togglelogin} showAlert={showAlert} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userdetails" element={<UserDetails toggleadmin={toggleadmin} />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/userdetails" element={<UserDashboard />} />
        <Route path= "/admindashboard/addtemplates" element={<AddTemplates showAlert={showAlert}/>} />
        <Route path= "/admindashboard/Users" element={<Users showAlert={showAlert}/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
