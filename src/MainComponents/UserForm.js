import React, { useState } from 'react';
import './UserStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import base_url from '../api/bootapi';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

import { Container,
Button,
Form,
ButtonGroup

} from 'reactstrap';
const UserForm = ({ isSignup, toggleSignup }) => {
  
const navigate = useNavigate();



  //input animation
  const [isFocused, setIsFocused] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    if (
      document.getElementById("userEmail")?.value ||
      document.getElementById("userPassword")?.value ||
      document.getElementById("userName")?.value ||
      document.getElementById("userPhone")?.value ||
      document.getElementById("userRole")?.value ||
      document.getElementById("newUserPassword")?.value ||
      document.getElementById("newUserEmail")?.value
    ) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  };
  
  
 
    const [isSuccess, setIsSuccess] = useState(false);

    const { login } = useAuth(); 
    const [userData, setUserData] = useState({
        userEmail: '',
        userPassword: '',
      });
     
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
         getDataFromServer(userData)
      };

      async function getDataFromServer(data)
      {
        try
        {
          const response = await axios.get(`${base_url}/users?userEmail=${userData.userEmail}&userPassword=${userData.userPassword}`);
          const user = response.data;
          login(user);
          toast.success("Log In Success");
          await new Promise(resolve => setTimeout(resolve, 5000));
          if(user.userRole==='Trainer')
           {
             navigate('/trainerHome');
           }
           else if(user.userRole === 'Student')
           {
             navigate('/studentHome');
          }

        }
        catch(error){
          toast.error("In valid Details")
        }
      }
      //Sign in 
      const [newUserData, setNewUserData] = useState({
        userName: '',
        newUserEmail: '',
        userPhone: '',
        userRole: '',
        newUserPassword: '',
      });

      const newUserInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({ ...newUserData, [name]: value });
      };
      const handleNewUserSubmit = (event) => {
        event.preventDefault();
        postDataToServer();
      };

      async function postDataToServer() {
        const dataToPost = {
          userName: newUserData.userName,
          userEmail: newUserData.newUserEmail,
          userPhone: newUserData.userPhone,
          userRole: newUserData.userRole,
          userPassword: newUserData.newUserPassword,
        };
      
        try {
          const response = await axios.post(`${base_url}/users`, dataToPost);
          toast.success("Sign In Success");
          // Delay for 5000 milliseconds (5 seconds)
          await new Promise(resolve => setTimeout(resolve, 5000));
          navigate("/log_in");
        } catch (error) {
          toast.error("Sign in not success");
          
        }
      }

    const handleSignIn = () => {
    setIsSuccess(true);
     };
  return (
    <div>
          <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container className='container'>
        <div className='frame'>
          <div className='nav'>
            <ul className='links'>
            <li className={isSignup ? 'signin-inactive' : 'signin-active'}>
                <a className='btn' onClick={toggleSignup}>
                  Log In
                </a>
              </li>
              <li className={isSignup ? 'signup-active' : 'signup-inactive'}>
                <a className='btn' onClick={toggleSignup}>
                  Sign In
                </a>
              </li>
            </ul>
          </div>
  <div className={`form-container ${isSignup ? 'form-hidden' : 'form-signin'}`}>
           
    <Form onSubmit={handleSubmit}>
              <div className="formBody">
                <div
                  className={`input-group ${
                    isFocused || isInputValid ? "active" : ""
                  }`}
                >
                  <input
                    className="input"
                    autoComplete="off"
                    type="text"
                    name="userEmail"
                    id="userEmail"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    value={userData.userEmail}
                    onChange={handleInputChange}
                    required
                    validation={{
                      required: { message: "Email is required" },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                  />
                  <span></span>
                  <label
                    className={`label ${
                      isFocused || isInputValid ? "active" : ""
                    }`}
                    htmlFor="Email"
                  >
                    Email
                  </label>
                </div>
             
                <div
                  className={`input-group ${
                    isFocused || isInputValid ? "active" : ""
                  }`}
                >
                  <input
                    className="input"
                    autoComplete="off"
                    type="password"
                    name="userPassword"
                    id="userPassword"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    value={userData.userPassword}
                    onChange={handleInputChange}
                    required
                    validation={{
                      required: { message: "Password is required" },
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    }}
                  />
                  <span></span>
                  <label
                    className={`label ${
                      isFocused || isInputValid ? "active" : ""
                    }`}
                    htmlFor="Password"
                  >
                    Password
                  </label>
                </div>
              </div>
              <p></p><p></p>
              <button className="logInbutton" type="submit" name="submitButton"> Log In</button>
              
              <div className='forgotPassword'>
                <a href="#">Forgot your password?</a>
              </div>
            </Form>
            
          </div>
          <div className={`form-container ${isSignup ? 'form-signup' : 'form-hidden'}`}>
  <Form onSubmit={handleNewUserSubmit}>
      <div className='formBody'>
      <div
            className={`input-group ${
              isFocused || isInputValid ? "active" : ""
              }`}
        >
          <input
                    className="input"
                    autoComplete="off"
                    type="text"
                    name="userName"
                    id="userName"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    value={newUserData.userName}
                    onChange={newUserInputChange}
                    required
                    validation={{
                      required: { message: "Please enter the name" },
                      pattern: {
                        value: /^[A-Za-z]/i,
                        message: "Invalid Name, Enter Aplhabeta only",
                      },
                    }}
                  />
                  <span></span>
                  <label
                    className={`label ${
                      isFocused || isInputValid ? "active" : ""
                    }`}
                    htmlFor="userName"
                  >
                    Name
                  </label> 
        </div>
        <div
                  className={`input-group ${
                    isFocused || isInputValid ? "active" : ""
                  }`}
                >
                  <input
                    className="input"
                    autoComplete="off"
                    type="email"
                    spellCheck='false'
                    name="newUserEmail"
                    id="newUserEmail"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    value={newUserData.newUserEmail}
                    onChange={newUserInputChange}
                    required
                    validation={{
                      required: { message: "Email is required" },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                  />
                  <span></span>
                  <label
                    className={`label ${
                      isFocused || isInputValid ? "active" : ""
                    }`}
                    htmlFor="Email"
                  >
                    Email
                  </label>
                </div>
                <div
                  className={`input-group ${
                    isFocused || isInputValid ? "active" : ""
                  }`}
                >
                  <input
                    className="input"
                    autoComplete="off"
                    type="text"
                    name="userPhone"
                    id="userPhone"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    value={newUserData.userPhone}
                    onChange={newUserInputChange}
                    required
                    validation={{
                      required: { message: "Phone No is required" },
                      pattern: {
                        value: /^[0-9]{10}/i,
                        message: "Invalid Phone No, Enter the Numbers Only",
                      },
                    }}
                  />
                  <span></span>
                  <label
                    className={`label ${
                      isFocused || isInputValid ? "active" : ""
                    }`}
                    htmlFor="userPhone"
                  >
                    Phone no
                  </label>
                </div>
                <div
                  className={`input-group ${
                    isFocused || isInputValid ? "active" : ""
                  }`}
                >
                  <input
                    className="input"
                    autoComplete="off"
                    type="password"
                    name="newUserPassword"
                    id="newUserPassword"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    value={newUserData.newUserPassword}
                    onChange={newUserInputChange}
                    required
                    validation={{
                      required: { message: "Password is required" },
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    }}
                  />
                  <span></span>
                  <label
                    className={`label ${
                      isFocused || isInputValid ? "active" : ""
                    }`}
                    htmlFor="Password"
                  >
                    Password
                  </label>
                </div> 
                
                <ButtonGroup className='roleBody' required>
                  <h5 className='roleHeading' required>Role</h5>
                    
                    <Button
                    className='roleInput'
                     color='primary'
                     outline
                     name='userRole'
                     id='Trainer'
                     value='Trainer'
                     onClick={newUserInputChange}
                     active={newUserData.userRole === 'Trainer'}
                    ><span className='roleLabel'>Trainer</span></Button>
                    
                     <Button
                     className='roleInput'
                     outline
                    color='primary'
                     name='userRole'
                     id='Student'
                     value='Student'
                     onClick={newUserInputChange}
                     active={newUserData.userRole === 'Student'}
                    ><span className='roleLabel'>Student</span></Button>
                    
                </ButtonGroup>
      </div>
      <p></p><p></p>
     <button className="logInbutton" type="submit" name="submitButton"> Sign In</button>
  </Form>

 

  

      
     


            {/* <Button className='btn-signup' onClick={handleSignIn}>
              Sign In
            </Button> */}
          </div>
          {/* {isSuccess && (
            <div className='success'>
              <div className='success-text'>
                <p>New User registered, Kindly check your email for confirmation.</p>
              </div>
            </div>
          )} */}
        </div>
      </Container>
    </div>
  );
};

export default UserForm;
