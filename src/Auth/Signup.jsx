import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../main";
import './Signup.css'

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      `https://job-portal-backend-42xa.onrender.com/api/v1/user/register`,
      { name, phone, email, role, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    toast.success(data.message);
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setRole("");
    setUser(data.user);           // ✅ Ensure user is set
    setIsAuthorized(true);        // ✅ Mark as logged in
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Something went wrong!";
    toast.error(errorMessage);
  }
};


  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }
  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <h3>Create a new account</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="inputTag">
            <label>Register As</label>
            <div>
              <select
                className="text-black"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option className="text-black" value="">Select Role</option>
                <option className="text-black" value="Employer">Employer</option>
                <option className="text-black" value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label>Name</label>
            <div>
              <input
                className="text-black"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FaPencilAlt />
            </div>
          </div>
          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input
                className="text-black"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputTag">
            <label>Phone number</label>
            <div>
              <input
                className="text-black"
                type="tel"  // Changed to tel type
                placeholder="Enter your phone no"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <FaPhoneFlip />
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                className="text-black"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiLock2Fill />
            </div>
          </div>
          <button type="submit">Sign Up</button>
          <Link to={"/login"}>Login Now</Link>
        </form>
      </div>
      <div className="banner">
        <img className="h-100" src="/login.jpeg" alt="login" />
      </div>
    </section>
  );
};

export default Signup;
