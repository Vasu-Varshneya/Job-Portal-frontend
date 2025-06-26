import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import "./MyApplications.css"; // ✅ Make sure to import the CSS

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const endpoint =
      user?.role === "Employer"
        ? "employer/getall"
        : "jobseeker/getall";

    axios
      .get(`http://localhost:4000/api/v1/application/${endpoint}`, {
        withCredentials: true,
      })
      .then((res) => {
        setApplications(res.data.applications);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to load applications.");
      });
  }, [isAuthorized, user]);

  const deleteApplication = (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setApplications((prev) => prev.filter((app) => app._id !== id));
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to delete application.");
      });
  };

  const openModal = (url) => {
    setResumeImageUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <section className="applications-section">
      <div className="applications-container">
        <h1 className="applications-title">
          {user?.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}
        </h1>
        {applications.length === 0 ? (
          <p className="no-applications-text">No Applications Found</p>
        ) : (
          applications.map((element) =>
            user?.role === "Job Seeker" ? (
              <JobSeekerCard
                key={element._id}
                element={element}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ) : (
              <EmployerCard
                key={element._id}
                element={element}
                openModal={openModal}
              />
            )
          )
        )}
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className="application-card">
    <div className="application-details">
      <p><strong>Name:</strong> {element.name}</p>
      <p><strong>Email:</strong> {element.email}</p>
      <p><strong>Phone:</strong> {element.phone}</p>
      <p><strong>Address:</strong> {element.address}</p>
      <p><strong>Cover Letter:</strong> {element.coverLetter}</p>
    </div>
    <div className="application-resume">
      <img
        src={element.resume.url}
        alt="Resume"
        onClick={() => openModal(element.resume.url)}
        className="resume-thumbnail"
      />
    </div>
    <div className="application-actions">
      <button className="delete-button" onClick={() => deleteApplication(element._id)}>
        Delete Application
      </button>
    </div>
  </div>
);

const EmployerCard = ({ element, openModal }) => (
  <div className="application-card">
    <div className="application-details">
      <p><strong>Name:</strong> {element.name}</p>
      <p><strong>Email:</strong> {element.email}</p>
      <p><strong>Phone:</strong> {element.phone}</p>
      <p><strong>Address:</strong> {element.address}</p>
      <p><strong>Cover Letter:</strong> {element.coverLetter}</p>
    </div>
    <div className="application-resume">
      <img
        src={element.resume.url}
        alt="Resume"
        onClick={() => openModal(element.resume.url)}
        className="resume-thumbnail"
      />
    </div>
  </div>
);
