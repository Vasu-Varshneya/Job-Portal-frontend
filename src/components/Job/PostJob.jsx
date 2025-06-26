import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import './PostJob.css';

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleJobPost = async (e) => {
    e.preventDefault();

    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    const jobData =
      fixedSalary.length >= 4
        ? {
            title,
            description,
            category,
            country,
            city,
            location,
            fixedSalary,
          }
        : {
            title,
            description,
            category,
            country,
            city,
            location,
            salaryFrom,
            salaryTo,
          };

    try {
      const res = await axios.post("http://localhost:4000/api/v1/job/post", jobData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Navigate to all jobs page on success
      navigateTo("/job/getall");  // <-- change '/jobs' to your actual route for all jobs
    } catch (err) {
      // For errors, just alert or log or handle differently as you want
      alert(err.response?.data?.message || "Job post failed.");
    }
  };

  return (
    <div className="postjob-page">
      <div className="postjob-container">
        <h3 className="postjob-heading">POST NEW JOB</h3>
        <form onSubmit={handleJobPost} className="postjob-form">
          <div className="postjob-row">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
              className="postjob-input"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="postjob-select"
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">Frontend Web Development</option>
              <option value="Business Development Executive">Business Development Executive</option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">MEAN Stack Development</option>
              <option value="MERN Stack Development">MERN Stack Development</option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>
          <div className="postjob-row">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="postjob-input"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="postjob-input"
            />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="postjob-input"
          />
          <div className="postjob-salary-wrapper">
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              className="postjob-select"
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            <div>
              {salaryType === "default" ? (
                <p className="postjob-warning">Please provide Salary Type *</p>
              ) : salaryType === "Fixed Salary" ? (
                <input
                  type="number"
                  placeholder="Enter Fixed Salary"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                  className="postjob-input"
                />
              ) : (
                <div className="postjob-ranged-salary">
                  <input
                    type="number"
                    placeholder="Salary From"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                    className="postjob-input"
                  />
                  <input
                    type="number"
                    placeholder="Salary To"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                    className="postjob-input"
                  />
                </div>
              )}
            </div>
          </div>
          <textarea
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            className="postjob-textarea"
          />
          <button type="submit" className="postjob-button">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
