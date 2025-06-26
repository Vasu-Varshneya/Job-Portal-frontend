import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

import "./Jobdetail.css"
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`https://job-portal-backend-42xa.onrender.com/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  useEffect(() => {
  if (!isAuthorized) {
    navigateTo("/login");
  }
}, [isAuthorized]);


  return (
    <section className="job-details-section">
      <div className="job-details-container">
        <h3 className="job-details-heading">Job Details</h3>
        <div className="job-details-content">
          <p className="job-detail-item">
            Title: <span>{job.title}</span>
          </p>
          <p className="job-detail-item">
            Category: <span>{job.category}</span>
          </p>
          <p className="job-detail-item">
            Country: <span>{job.country}</span>
          </p>
          <p className="job-detail-item">
            City: <span>{job.city}</span>
          </p>
          <p className="job-detail-item">
            Location: <span className="scrollable-vertical">{job.location}</span>
          </p>
          <p className="job-detail-item">
            Description: <span className="scrollable-vertical">{job.description}</span>
          </p>

          <p className="job-detail-item">
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p className="job-detail-item">
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? null : (
            <Link className="apply-button" to={`/application/${job._id}`}>
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
