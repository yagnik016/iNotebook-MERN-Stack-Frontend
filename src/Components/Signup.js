import React, { useState } from "react";

export default function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState({
    name: true,
    email: true,
    password: true,
  });

  const onChange = (e) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });

    // Validate input fields
    if (id === "name") {
      setValidation({ ...validation, name: value.length >= 3 });
    } else if (id === "email") {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidation({ ...validation, email: emailRegex.test(value) });
    } else if (id === "password") {
      setValidation({ ...validation, password: value.length >= 3 });
    }
  };

  const isFormValid = Object.values(validation).every((isValid) => isValid);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      props.showAlert("Invalid input. Please check the form.", "danger");
      return;
    }

    // Rest of your code for sending the signup request
    const response = await fetch("http://localhost:8000/auth/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Registration Failed", "danger");
    }
  };

  return (
    <div>
      <h1 className="text-center">Signup to continue</h1>
      <form className="container my-4 w-50 bg-light rounded shadow mb-5 mt-5 p-5">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${validation.name ? "" : "is-invalid"}`}
            id="name"
            value={credentials.name}
            onChange={onChange}
          />
          {!validation.name && (
            <div className="invalid-feedback">Name must be at least 3 characters</div>
          )}
        </div>
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
          onClick={handleSignup}
          disabled={!isFormValid}
        >
          Signup
        </button>
      </form>
    </div>
  );
}
