import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [validation, setValidation] = useState({
    email: true,
    password: true,
  });

  const onChange = (e) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });

    // Validate input fields
    if (id === "email") {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidation({ ...validation, email: emailRegex.test(value) });
    } else if (id === "password") {
      setValidation({ ...validation, password: value.length >= 3 });
    }
  };

  const isFormValid = Object.values(validation).every((isValid) => isValid);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      props.showAlert("Invalid input. Please check the form.", "danger");
      return;
    }

    // Rest of your code for sending the login request
    const response = await fetch("http://localhost:8000/auth/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.token);
      props.showAlert("Login Successful", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <div>
      <h1 className="text-center">Login to continue</h1>
      <form className="container my-4 w-50 bg-light rounded shadow mb-5 mt-5 p-5">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${validation.email ? "" : "is-invalid"}`}
            id="email"
            value={credentials.email}
            onChange={onChange}
          />
          {!validation.email && (
            <div className="invalid-feedback">Enter a valid email address</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${validation.password ? "" : "is-invalid"}`}
            id="password"
            value={credentials.password}
            onChange={onChange}
          />
          {!validation.password && (
            <div className="invalid-feedback">Password must be at least 3 characters</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-success mt-3"
          style={{ marginLeft: "45%", position: "relative" }}
          onClick={handleLogin}
          disabled={!isFormValid}
        >
          Login
        </button>
        <span
          className="tooltip"
          style={{
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Add this note
        </span>
      </form>
    </div>
  );
}
