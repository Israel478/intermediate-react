import React, { useState } from "react";
import '../App.css';

const regestration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form input values
  const validateForm = () => {
    const newErrors = {};

    const { firstName, middleName, lastName, email, password } = formData;

    // First Name validation
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last Name validation
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    // Middle Name (optional but can't contain only spaces)
    if (middleName.trim() && !middleName.trim().length) {
      newErrors.middleName = "Middle name cannot be just spaces";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Add new user to registered users list
      setRegisteredUsers((prevList) => [
        ...prevList,
        { ...formData, id: Date.now() }
      ]);
      
      // Clear the form
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
      });

      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold text-center mb-6">Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="middleName">Middle Name</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="form-input"
          />
          {errors.middleName && <p className="error-message">{errors.middleName}</p>}
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-input"
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        >
          Register
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold">Registered Users</h3>
        <ul className="mt-4">
          {registeredUsers.length === 0 ? (
            <p>No users registered yet.</p>
          ) : (
            registeredUsers.map((user) => (
              <li key={user.id} className="mb-2">
                <p><strong>{user.firstName} {user.middleName} {user.lastName}</strong></p>
                <p>Email: {user.email}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default regestration ;
