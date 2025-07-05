import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../main";
import "./MyApplications.css"; // Import your CSS file

const Application = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    coverLetter: "",
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError("");

    if (!file) return setResume(null);

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Please upload PNG, JPEG, or WEBP format only.");
      return setResume(null);
    }

    if (file.size > 2 * 1024 * 1024) {
      setFileError("File must be under 2MB.");
      return setResume(null);
    }

    setResume(file);
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    const { name, email, phone, address, coverLetter } = form;

    if (!name || !email || !phone || !address || !coverLetter) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!resume) {
      setFileError("Please upload your resume");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "https://job-portal-backend-42xa.onrender.com/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        coverLetter: "",
      });
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again later.";
      toast.error(message);

      if (message.includes("Cloudinary") || message.includes("api_key")) {
        toast.error(
          "File upload service is temporarily unavailable. Try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application-section">
      <div className="application-container">
        <h2 className="application-title">Application Form</h2>
        <form className="application-form" onSubmit={handleApplication}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="coverLetter"
            placeholder="Cover Letter"
            value={form.coverLetter}
            onChange={handleInputChange}
            required
          />

          <div className="upload-wrapper">
            <label className="upload-label">
              Upload Resume
              <span className="upload-note">
                (PNG, JPEG, WEBP | Max size: 2MB)
              </span>
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={handleFileChange}
            />
            {fileError && <p className="upload-error">{fileError}</p>}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Send Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
