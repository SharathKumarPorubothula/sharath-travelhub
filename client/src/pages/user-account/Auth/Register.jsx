
import React, { useState } from 'react';
import './Register.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  
  const navigate = useNavigate(); 

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const validateName = () => {
    if (name.length < 4) {
      setErrors(prev => ({ ...prev, name: 'Name must be at least 4 characters long' }));
      return false;
    }
    setErrors(prev => ({ ...prev, name: '' }));
    return true;
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Email is not valid' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  };

  const validatePassword = () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.' }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: '' }));
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return false;
    }
    setErrors(prev => ({ ...prev, confirmPassword: '' }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidName = validateName();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();

    if (isValidName && isValidEmail && isValidPassword && isValidConfirmPassword) {
      const obj = { name, email, password, confirmPassword };

      try {
        const response = await fetch('https://sharath-travelhub.onrender.com/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj),
        });

        const data = await response.json();
        if (response.status === 201) {
          alert('Registration successful!');
          navigate('/');
        } else {
          alert(data.message || 'Registration failed. Try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
      }
    } else {
      alert('Please fill all fields correctly!');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('Google User:', user);
      const defaultPassword = 'Naruto@148';
      
      const response = await fetch('https://sharath-travelhub.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          password: defaultPassword,
          confirmPassword: defaultPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert('Google Registration successful!');
        navigate('/');
      } else {
        alert(data.message || 'Google Registration failed.');
      }
    } catch (error) {
      console.error('Google Signup Error:', error);
      alert('Google signup failed');
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} method="POST">
        <div className='register-div'>
        <div><label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
          onBlur={validateName} // Validate on blur
        />
        {errors.name && <p className="error">{errors.name}</p>}</div>
        
<div>  <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
          onBlur={validateEmail} // Validate on blur
        />
        {errors.email && <p className="error">{errors.email}</p>}</div>
      
<div> <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
          onBlur={validatePassword} // Validate on blur
        />
        {errors.password && <p className="error">{errors.password}</p>}</div>
       
<div><label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={validateConfirmPassword} // Validate on blur
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}</div>
        

        <button type="submit">Register</button>

        </div>
        
      </form>

      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={handleGoogleSignup}>
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
