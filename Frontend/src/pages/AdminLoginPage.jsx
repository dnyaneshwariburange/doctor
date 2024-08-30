import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../authContext";

export default function AdminLoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const submitData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    handleLogin(submitData);
    // event.target.reset();
  };

  const handleLogin = async (submitData) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/admin/login",
        submitData
      );

      const token = response.data.token;
      const isAdmin = response.data.isAdmin;

      if (response.status === 200) {
        login(token, isAdmin);
        navigate("/admin");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        setErrors(error.response.data.errors);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container w-50 mt-5 p-5 text-white bg-dark"
    >
      <h2>Admin Login</h2>
      {errors && (
        <ul>
          {Object.values(errors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="container">
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            ref={emailRef}
            className="form-control"
            id="email"
            type="email"
            name="email"
            placeholder="Enter Email"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            ref={passwordRef}
            className="form-control"
            id="password"
            type="password"
            name="password"
            placeholder="Enter Password"
          />
        </div>
      </div>

      <div className="m-3">
        <button type="reset" className="btn btn-info me-3">
          Reset
        </button>
        <button className="btn btn-primary">Login</button>
      </div>
    </form>
  );
}
