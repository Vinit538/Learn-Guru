// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import base_url from "../api/bootapi";
// import { useAuth } from "./AuthContext";
// import { useNavigate } from "react-router-dom";
// import "./UserFormStyle.css";
// import {
//   Container,
//   Button,
//   Form,
//   ButtonGroup,
//   Label,
//   Input,
//   FormGroup,
// } from "reactstrap";


//   const UserLogIn = () => {
//     const navigate = useNavigate();
//     const { login } = useAuth();
//     const [userData, setUserData] = useState({
//       userEmail: "",
//       userPassword: "",
//     });
  
//     const [emailValid, setEmailValid] = useState(true);
//     const [passwordValid, setPasswordValid] = useState(true);
  
//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setUserData({ ...userData, [name]: value });
//     };
  
//     const validateEmail = (value) => {
//       const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//       const isValid = emailRegex.test(value);
//       setEmailValid(isValid);
//       return isValid;
//     };
  
//     const validatePassword = (value) => {
//       const isValid = value.length >= 8;
//       setPasswordValid(isValid);
//       return isValid;
//     };
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();

  
      
//         try {
//           const response = await axios.get(
//             `${base_url}/users?userEmail=${userData.userEmail}&userPassword=${userData.userPassword}`
//           );
//           const user = response.data;
//           login(user);
//           toast.success("Log In Success");
//           await new Promise((resolve) => setTimeout(resolve, 5000));
//           if (user.userRole === "Trainer") {
//             navigate("/trainerHome");
//           } else if (user.userRole === "Student") {
//             navigate("/studentHome");
//           }
//         } catch (error) {
//           toast.error("Invalid Details");
//         }
      
//     };
  
//     return (
//       <div className="formBody">
//         {/* ... (existing code remains unchanged) */}
//         <Container className="formContainer">
//           <h1>Log In</h1>
//           <Form onSubmit={handleSubmit}>
//             <FormGroup>
//               <Label for="userEmail">Email</Label>
//               <Input
//                 className={`input ${!emailValid ? 'invalid' : ''} ${emailValid ? 'valid' : ''}`}
//                 autoComplete="off"
//                 type="text"
//                 name="userEmail"
//                 id="userEmail"
//                 value={userData.userEmail}
//                 onChange={handleInputChange}
//                 onBlur={(e) => validateEmail(e.target.value)}
//                 required
//               />
//               {!emailValid && (
//                 <div className="invalid-feedback">Invalid email address</div>
//               )}
//             </FormGroup>
//             <FormGroup>
//               <Label for="userPassword">Password</Label>
//               <Input
//                 className={`input ${!passwordValid ? 'invalid' : ''} ${passwordValid ? 'valid' : ''}`}
//                 autoComplete="off"
//                 type="password"
//                 name="userPassword"
//                 id="userPassword"
//                 value={userData.userPassword}
//                 onChange={handleInputChange}
//                 onBlur={(e) => validatePassword(e.target.value)}
//                 required
//               />
//               {!passwordValid && (
//                 <div className="invalid-feedback">Password must be at least 8 characters long</div>
//               )}
//             </FormGroup>
//             <button
//               className="logInbutton"
//               type="submit"
//               name="submitButton"
//             >
//               Log In
//             </button>
//           </Form>
//         </Container>
//       </div>
//     );
//   };
  
//   export default UserLogIn;

// //   const { login } = useAuth();
// //   const [userData, setUserData] = useState({
// //     userEmail: "",
// //     userPassword: "",
// //   });

// //   const [emailValid, setEmailValid] = useState(true);
// //   const [passwordValid, setPasswordValid] = useState(true);

// //   const handleInputChange = (e) => {
// //     console.log(userData);
// //     const { name, value } = e.target;
// //     setUserData({ ...userData, [name]: value });
// //   };

// //   const validateEmail = (value) => {
// //     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// //     const isValid = emailRegex.test(value);
// //     setEmailValid(isValid);
// //     return isValid;
// //   };

// //   const validatePassword = (value) => {
// //     const isValid = value.length >= 8;
// //     setPasswordValid(isValid);
// //     return isValid;
// //   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     console.log(userData);
// //     const isEmailValid = validateEmail(userData.userEmail);
// //     const isPasswordValid = validatePassword(userData.userPassword);

// //     if (isEmailValid && isPasswordValid) {
// //       getDataFromServer();
// //     }
// //   };

// //   async function getDataFromServer(data) {
// //     try {
// //       const response = await axios.get(
// //         `${base_url}/users?userEmail=${userData.userEmail}&userPassword=${userData.userPassword}`
// //       );
// //       const user = response.data;
// //       login(user);
// //       toast.success("Log In Success");
// //       await new Promise((resolve) => setTimeout(resolve, 5000));
// //       if (user.userRole === "Trainer") {
// //         navigate("/trainerHome");
// //       } else if (user.userRole === "Student") {
// //         navigate("/studentHome");
// //       }
// //     } catch (error) {
// //       toast.error("In valid Details");
// //     }
// //   }

// //   return (
// //     <div className="formBody">
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={5000}
// //         hideProgressBar={false}
// //         newestOnTop={false}
// //         closeOnClick
// //         rtl={false}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //         theme="colored"
// //       />
// //       <Container className="formContainer">
// //         <h1>Log In</h1>
// //         <Form onSubmit={handleSubmit}>
// //         <FormGroup>
// //             <Label for="userEmail">Email</Label>
// //             <Input
// //               className={`input ${!emailValid ? 'invalid' : ''} ${emailValid ? 'valid' : ''}`}
// //               autoComplete="off"
// //               type="text"
// //               name="userEmail"
// //               id="userEmail"
// //               value={userData.userEmail}
// //               onChange={handleInputChange}
// //               onBlur={(e) => validateEmail(e.target.value)}
// //               required
// //             />
// //             {!emailValid && (
// //               <div className="invalid-feedback">Invalid email address</div>
// //             )}
// //           </FormGroup>
// //           <FormGroup>
// //             <Label for="userPassword">Password</Label>
// //             <Input
// //               className={`input ${!passwordValid ? 'invalid' : ''} ${passwordValid ? 'valid' : ''}`}
// //               autoComplete="off"
// //               type="password"
// //               name="userPassword"
// //               id="userPassword"
// //               value={userData.userPassword}
// //               onChange={handleInputChange}
// //               onBlur={(e) => validatePassword(e.target.value)}
// //               required
// //             />
// //             {!passwordValid && (
// //               <div className="invalid-feedback">Password must be at least 8 characters long</div>
// //             )}
// //           </FormGroup>
// //           <button
// //             className="logInbutton"
// //             type="submit"
// //             name="submitButton"
// //           >
// //             Log In
// //           </button>
// //             {/* <FormGroup >
// //             <Label  for="userEmail">Email</Label>
// //             <Input
// //                     className="input invalid valid"
// //                     autoComplete="off"
// //                     type="text"
// //                     name="userEmail"
// //                     id="userEmail"
// //                     value={userData.userEmail}
// //                     onChange={handleInputChange}
// //                     required
// //                     validation={{
// //                       required: { message: "Email is required" },
// //                       pattern: {
// //                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// //                         message: "Invalid email address",
// //                       },
// //                     }}
// //                   />
           

// //             </FormGroup>
// //             <FormGroup>
// //             <Label for="userPassword">Password</Label>
// //             <Input
// //                     className="input"
// //                     autoComplete="off"
// //                     type="password"
// //                     name="userPassword"
// //                     id="userPassword"
// //                     value={userData.userPassword}
// //                     onChange={handleInputChange}
// //                     required
// //                     validation={{
// //                       required: { message: "Password is required" },
// //                       minLength: {
// //                         value: 8,
// //                         message: "Password must be at least 8 characters long",
// //                       },
// //                     }}
// //                   />
// //             </FormGroup>

// //             <button className="logInbutton" type="submit" name="submitButton"> Log In</button> */}

// //         </Form>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default UserLogIn;
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import base_url from "../api/bootapi";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./UserFormStyle.css";
import {
  Container,
  Button,
  Form,
  ButtonGroup,
  Label,
  Input,
  FormGroup,
} from "reactstrap";

const UserLogIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userData, setUserData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailRegex.test(value);
    setEmailValid(isValid);
    return isValid;
  };

  const validatePassword = (value) => {
    const isValid = value.length >= 8;
    setPasswordValid(isValid);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `${base_url}/users?userEmail=${userData.userEmail}&userPassword=${userData.userPassword}`
      );
      const user = response.data;
      login(user);
      toast.success("Log In Success");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (user.userRole === "Trainer") {
        navigate("/trainerHome");
      } else if (user.userRole === "Student") {
        navigate("/studentHome");
      }
    } catch (error) {
      toast.error("Invalid Details");
    }
  };

  return (
    <div className="formBody">
      <Container className="formContainer">
        <h1>Log In</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="userEmail">Email</Label>
            <Input
              className={`input ${!emailValid ? 'invalid' : ''} ${emailValid ? 'valid' : ''}`}
              autoComplete="off"
              type="text"
              name="userEmail"
              id="userEmail"
              value={userData.userEmail}
              onChange={handleInputChange}
              onBlur={(e) => validateEmail(e.target.value)}
              required
            />
            {!emailValid && (
              <div className="invalid-feedback">Invalid email address</div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="userPassword">Password</Label>
            <Input
              className={`input ${!passwordValid ? 'invalid' : ''} ${passwordValid ? 'valid' : ''}`}
              autoComplete="off"
              type="password"
              name="userPassword"
              id="userPassword"
              value={userData.userPassword}
              onChange={handleInputChange}
              onBlur={(e) => validatePassword(e.target.value)}
              required
            />
            {!passwordValid && (
              <div className="invalid-feedback">Password must be at least 8 characters long</div>
            )}
          </FormGroup>
          <button
            className="logInbutton"
            type="submit"
            name="submitButton"
          >
            Log In
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default UserLogIn;
