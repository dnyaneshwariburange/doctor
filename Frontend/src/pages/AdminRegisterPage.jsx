import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegisterPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/admin/register', {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log('Admin registered:', response.data);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error registering admin:', error);
      setErrors({ credentials: 'Registration failed. Please check your inputs.' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container w-50 mt-5 p-5 text-white bg-dark"
    >
      <h2>Admin Registration</h2>
      {errors && (
        <ul>
          {Object.values(errors).map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      )}
      <div className="container">
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            ref={nameRef}
            className="form-control"
            id="name"
            type="text"
            name="name"
            placeholder="Enter Name"
          />
        </div>
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
        <button className="btn btn-primary">Register</button>
      </div>
    </form>
  );
};

export default AdminRegisterPage;
