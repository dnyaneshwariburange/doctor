import { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../authContext';

const UserLoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/user/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const isAdmin = response.data.isAdmin;
        login(token, isAdmin);
        navigate('/user/home');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response:', error.response.data);
        setErrors({ credentials: error.response.data.message });
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something else caused the error
        console.error('Error message:', error.message);
      }
      setErrors({ credentials: 'Invalid email or password' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container w-50 mt-5 p-5 text-white bg-dark"
    >
      <h2>User Login</h2>
      {errors && (
        <ul>
          {Object.values(errors).map((error) => {
            return <li key={error}>{error}</li>;
          })}
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
};

export default UserLoginPage;
