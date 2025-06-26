import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized,user,setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setUser(data.user);
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }
  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h3>Login to your account</h3>
          </div>
          <form onSubmit={handleLogin}>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select className="text-black " value={role} onChange={(e) => setRole(e.target.value)}>
                  <option className="text-black" value="">Select Role</option>
                  
                  <option className="text-black" value="Job Seeker">Job Seeker</option>
                  <option className="text-black" value="Employer">Employer</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email" className="text-black"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input className="text-black"
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <Link to={"/signup"}>SignUp Now</Link>
          </form>
        </div>
        <div className="banner">
          <img className="h-100" src="/login.jpeg" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;