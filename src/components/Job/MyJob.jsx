import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import "./MyJobs.css"; // Importing the new CSS

const MyJob = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
        console.log('req sent')
      try {
        const { data } = await axios.get(
          `https://job-portal-backend-42xa.onrender.com/api/v1/job/getmyjobs`,
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => setEditingMode(jobId);
  const handleDisableEdit = () => setEditingMode(null);

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const { data } = await axios.put(
        `https://job-portal-backend-42xa.onrender.com/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const { data } = await axios.delete(
        `https://job-portal-backend-42xa.onrender.com/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <section className="jobs-section">
      <div className="jobs-container">
        <h1 className="section-title">Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="jobs-list">
            {myJobs.map((job) => (
              <div className="job-card" key={job._id}>
                <div className="job-fields">
                  <input
                    type="text"
                    disabled={editingMode !== job._id}
                    value={job.title}
                    onChange={(e) => handleInputChange(job._id, "title", e.target.value)}
                    placeholder="Job Title"
                  />
                  <input
                    type="text"
                    disabled={editingMode !== job._id}
                    value={job.country}
                    onChange={(e) => handleInputChange(job._id, "country", e.target.value)}
                    placeholder="Country"
                  />
                  <input
                    type="text"
                    disabled={editingMode !== job._id}
                    value={job.city}
                    onChange={(e) => handleInputChange(job._id, "city", e.target.value)}
                    placeholder="City"
                  />
                  <select
                    disabled={editingMode !== job._id}
                    value={job.category}
                    onChange={(e) => handleInputChange(job._id, "category", e.target.value)}
                  >
                    <option value="Graphics & Design">Graphics & Design</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Frontend Web Development">Frontend Web Development</option>
                    <option value="MERN Stack Development">MERN Stack Development</option>
                    <option value="Account & Finance">Account & Finance</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Video Animation">Video Animation</option>
                    <option value="MEAN Stack Development">MEAN Stack Development</option>
                    <option value="MEVN Stack Development">MEVN Stack Development</option>
                    <option value="Data Entry Operator">Data Entry Operator</option>
                  </select>
                  <div className="salary-fields">
                    {job.fixedSalary ? (
                      <input
                        type="number"
                        disabled={editingMode !== job._id}
                        value={job.fixedSalary}
                        onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)}
                        placeholder="Fixed Salary"
                      />
                    ) : (
                      <>
                        <input
                          type="number"
                          disabled={editingMode !== job._id}
                          value={job.salaryFrom}
                          onChange={(e) => handleInputChange(job._id, "salaryFrom", e.target.value)}
                          placeholder="Salary From"
                        />
                        <input
                          type="number"
                          disabled={editingMode !== job._id}
                          value={job.salaryTo}
                          onChange={(e) => handleInputChange(job._id, "salaryTo", e.target.value)}
                          placeholder="Salary To"
                        />
                      </>
                    )}
                  </div>
                  <select
                    disabled={editingMode !== job._id}
                    value={job.expired}
                    onChange={(e) => handleInputChange(job._id, "expired", e.target.value)}
                  >
                    <option value={true}>TRUE</option>
                    <option value={false}>FALSE</option>
                  </select>
                </div>

                <textarea
                  disabled={editingMode !== job._id}
                  value={job.description}
                  onChange={(e) => handleInputChange(job._id, "description", e.target.value)}
                  placeholder="Job Description"
                />
                <textarea
                  disabled={editingMode !== job._id}
                  value={job.location}
                  onChange={(e) => handleInputChange(job._id, "location", e.target.value)}
                  placeholder="Location"
                />

                <div className="job-actions">
                  {editingMode === job._id ? (
                    <>
                      <button onClick={() => handleUpdateJob(job._id)} className="btn confirm">
                        <FaCheck />
                      </button>
                      <button onClick={handleDisableEdit} className="btn cancel">
                        <RxCross2 />
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEnableEdit(job._id)} className="btn edit">
                      Edit
                    </button>
                  )}
                  <button onClick={() => handleDeleteJob(job._id)} className="btn delete">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-jobs-message">
            You haven't posted any jobs or may have deleted them all!
          </p>
        )}
      </div>
    </section>
  );
};

export default MyJob;
