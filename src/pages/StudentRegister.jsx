import React, { useState } from "react";
import logo from "../assets/images/apply-uni-logo.png";
import "../assets/style.css";
import { useFormContext } from "../context/FormContext";
import { toast } from "react-toastify";
//SUCCESS POPUP 
  const SuccessPopup = () => (
    <div className="success-popup-overlay">
      <div className="success-popup">
        <div className="success-checkmark">
          <svg viewBox="0 0 52 52">
            <circle className="success-circle" cx="26" cy="26" r="25" />
            <path
              className="success-check"
              fill="none"
              d="M14 27 l7 7 l17 -17"
            />
          </svg>
        </div>
        <h2>Registration Successful!</h2>
        <p>Please check your email for your password.</p>
      </div>
    </div>
  );

const StudentRegister = () => {
  const { student, updateStudent, submitStudent } = useFormContext();

  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  //HANDLE INPUT 
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateStudent({ [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      updateStudent({ photo: e.target.files[0] });
    }
  };

  // SUBMIT 
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!student.firstName.trim())
      newErrors.firstName = ["First name is required"];
    if (!student.lastName.trim())
      newErrors.lastName = ["Last name is required"];

    if (!student.email.trim()) {
      newErrors.email = ["Email is required"];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      newErrors.email = ["Invalid email format"];
    }

    if (!student.nationality.trim())
      newErrors.nationality = ["Nationality is required"];
    if (!student.country.trim())
      newErrors.country = ["Country is required"];

    if (student.contactnumber || student.countrycode) {
      if (!student.countrycode)
        newErrors.countrycode = ["Country code required"];
      if (!student.contactnumber.trim()) {
        newErrors.contactnumber = ["Contact number required"];
      } else if (!/^\d{7,15}$/.test(student.contactnumber)) {
        newErrors.contactnumber = ["Invalid phone number"];
      }
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      toast.error("Please fix the highlighted errors");
      return;
    }

    const toastId = toast.loading("Registering student...");

    try {
      await submitStudent();

      toast.update(toastId, {
        render: "Registration successful Check your email",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 4000);

      setErrors({});
      updateStudent({
        firstName: "",
        lastName: "",
        email: "",
        nationality: "",
        country: "",
        countrycode: "",
        contactnumber: "",
        photo: null,
      });

    } catch (error) {
      toast.update(toastId, {
        render:
          error.response?.status === 422
            ? "Validation failed. Please check inputs."
            : "Server error! Try again later.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });

      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      }
    }
  };

  
  //UI
  return (
    <div className="form-wrapper__section">
      {showSuccessPopup && <SuccessPopup />}

      <div className="container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="content-wrapper">

            {/* LEFT */}
            <div className="left-section">
              <div className="welcome-content">
                <h1>Welcome to</h1>
                <div className="brand-logo">
                  <img src={logo} alt="ApplyUni Logo" className="brand-icon" />
                </div>
                <p className="tagline">
                  We help you choose the best educational path.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="right-section">
              <div className="form-container">
                <h2 className="form-title">Create a Profile</h2>
                <h3 className="section-title">Student Registration</h3>

                <div className="form-content">

                  {[
                    ["firstName", "First Name *"],
                    ["lastName", "Last Name *"],
                    ["email", "Email *"],
                    ["nationality", "Nationality *"],
                    ["country", "Country *"],
                  ].map(([name, label]) => (
                    <div className="form-group" key={name}>
                      <label>{label}</label>
                      <input
                        className="inputForm"
                        name={name}
                        type={name === "email" ? "email" : "text"}
                        value={student[name]}
                        onChange={handleChange}
                      />
                      {errors[name] && (
                        <p className="error-text">{errors[name][0]}</p>
                      )}
                    </div>
                  ))}

                  <div className="form-group">
                    <label>Country Code</label>
                    <select
                      name="countrycode"
                      value={student.countrycode}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="+977">+977 (Nepal)</option>
                      <option value="+91">+91 (India)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+1">+1 (USA/Canada)</option>
                      <option value="+61">+61 (Australia)</option>
                    </select>
                    {errors.countrycode && (
                      <p className="error-text">{errors.countrycode[0]}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      className="inputForm"
                      name="contactnumber"
                      value={student.contactnumber}
                      onChange={handleChange}
                    />
                    {errors.contactnumber && (
                      <p className="error-text">{errors.contactnumber[0]}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Upload Photo</label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        id="photo"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <input
                        type="text"
                        readOnly
                        value={
                          student.photo ? student.photo.name : "No File Chosen"
                        }
                      />
                      <label htmlFor="photo" className="file-btn">
                        Choose File
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="next-btn">
                      Register Now
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
