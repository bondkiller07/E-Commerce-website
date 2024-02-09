import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import nikeLogo from '../Components/Assets/nike_logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData,setFormData] =useState ({
    username : "",
    phoneNumber:"",
    password : "",
    email : ""
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const login = async () => {
    console.log("Login Function is Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => { responseData = data; })
    .catch((error) => { console.error('Error during signup:', error); });
  

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors)
    }
  };
  

const signup = async () => {
  console.log("Sign-Up Function is Executed", formData);
  let responseData;

  await fetch('http://localhost:4000/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then((response) => response.json())
  .then((data) => { responseData = data; })
  .catch((error) => { console.error('Error during signup:', error); });

  if (responseData.success) {
    localStorage.setItem('auth-token', responseData.token);
    window.location.replace("/");
  }
  else{
    alert(responseData.errors)
  }
};

  

  return (
    <div className='nikeform'>
      <div className="form-container sign-up-container">
        <div className='loginsignup-fields'>
          <div className="nikelogo">
            <img src={nikeLogo} alt="nike logo" />
            <h1>{state}</h1>
          </div>
          <div className="social-container">
            <a href="#social-register"><i className="fab fa-facebook"></i></a>
            <a href="#social-register"><i className="fab fa-google-plus-g"></i></a>
            <a href="#social-register"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          {state === "Sign Up" && (
            <>
              <input type="text" placeholder="Full Name *" name="username" value={formData.username} onChange={changeHandler} />
              <input
                type="tel"
                placeholder="Phone Number *"
                pattern="[0-9]*"
                title="Please enter a valid phone number (numbers only)"
                minLength="10"
                maxLength="10"
                name="phoneNumber"
                inputMode="numeric"
                value={formData.phoneNumber} onChange={changeHandler}
              />
            </>
          )}
          <input type="email" name="email"  value={formData.email} onChange={changeHandler} placeholder="Email" />
          <input type="password" placeholder="Password *" name="password"  value={formData.password} onChange={changeHandler} />
          <button className="nikelogo-btn" onClick={() => (state === "Login" ? login() : signup())}>Continue</button>
          {state === "Sign Up" ?
            <p onClick={() => setState("Login")} className="clickable">Already have an account?<span>Login</span><i className="fas fa-arrow-right"></i></p> :
            <p onClick={() => setState("Sign Up")} className="clickable">Create an account? <span>Sign Up </span><i className="fas fa-arrow-right"></i></p>}
          <p className="privacy">By Signing Up, you agree to Our Privacy Policy and Terms of Use.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
