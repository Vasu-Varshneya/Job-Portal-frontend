import { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import Applications from "./Application/Applications";
import JobDetails from "./components/Job/JobDetails";
import Jobs from "./components/Job/Jobs";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Layout/Navbar";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import PostJob from "./components/Job/PostJob";
import { Context } from "./main";
import MyJob from "./components/Job/MyJob";
import MyApplications from "./Application/MyApplications";
function AppContent() {
  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context);
  const location = useLocation();

  // Hide Navbar on login and signup pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getuser`, {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        if (!user) setIsAuthorized(false);
      }
    };
    fetchUser();
  }, []); // Only run on mount
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path='/job/me' element={<MyJob/>}/>
        <Route path='/applications/me' element={<Applications/>}/>
        <Route path="/application/:id" element={<MyApplications/>}/>
        {/* Other routes here */}
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
