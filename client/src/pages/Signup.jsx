
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { validateEmail, validateUsername, validatePassword } from '../../validation';

const Signup = () => {
  const [formdata, setFormdata] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!validateUsername(formdata.userName)) {
      validationErrors.userName = 'Invalid username.';
    }
    if (!validateEmail(formdata.email)) {
      validationErrors.email = 'Invalid email.';
    }
    if (!validatePassword(formdata.password)) {
      validationErrors.password = 'Weak password.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError("Something went wrong!");
        return;
      }

      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError("Something went wrong!");
    }
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 '>Signup</h1>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <input
            type="text"
            id="userName"
            placeholder='Username'
            className='bg-slate-100 rounded-md p-3'
            onChange={handleChange}
          />
          {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}


{/* <input type="text" name="fname" id="fname" /> */}


          <input
            type="email"
            id="email"
            placeholder='Email'
            className='bg-slate-100 rounded-md p-3'
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            id="password"
            placeholder='Password'
            className='bg-slate-100 rounded-md p-3'
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button disabled={loading} className='uppercase bg-purple-950 text-white rounded-lg p-3 hover:opacity-90 cursor-pointer disabled:opacity-70'>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth />
        </form>
      </div>
      <div className='flex pt-4'>
        <h1> Have an account? </h1>
        <Link to={'/signin'}>
          <span className='p-3 text-sky-800 text-sm'>Signin</span>
        </Link>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}

      
    </div>
  );
};

export default Signup;
