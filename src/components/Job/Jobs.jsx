import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Job.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/job/getall`, {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className="jobs-page">
      <div className="jobs-container">
        <h1 className="jobs-title">ALL AVAILABLE JOBS</h1>
        <div className="jobs-banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => (
              <div className="jobs-card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;

