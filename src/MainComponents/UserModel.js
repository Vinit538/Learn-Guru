import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, FormGroup, Input, Label } from "reactstrap";
import { useAuth } from "./AuthContext";
import axios from "axios";
import base_url from "../api/bootapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate } from "react-router-dom";


import "./ModalStyle.css";

const UserModel = () => {

  const { user,logout } = useAuth();

  const navigate = useNavigate();

  // const handleLogoutClick = () => {
  //   // Implement the logout logic
  //  logoutClick(); // call the prop function
  //   navigate('/'); // Redirect to the homepage after logout
  // };


  const [userDetails, setUserDetails] = useState({
    trainerEmail:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const [emailVerify ,setEmailVerfy]=useState(false);

  const handleUpdateDetailsClick = (e) => {
    e.preventDefault();


      console.log(user.userEmail +" : user page"+ userDetails.trainerEmail+" : same page");
    if(user.userEmail == userDetails.trainerEmail)
    {
      DeleteAccount();
    }
    else
    {
      setEmailVerfy(true);
    }
    
    console.log("ButtonClick2")
  };

  async function DeleteAccount()
  {
    try {
      const response = await axios.put(`${base_url}/deleteAccount/${user.userId}`);
      toast.success(response.data);
      navigate("/");
    } catch (error) {
      toast.error("account not deleted");
    }
  }
  return (
    <div className="trainerModal">
    <ToastContainer
      position="top-right"
      autoClose={6000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <h1>User Account</h1>
    <Form onSubmit={handleUpdateDetailsClick}>
     <Row>
      <Col>
      <FormGroup row>
        <Label className="modalLabel" for="userName">
          Name
        </Label>
        <Input
          className="modalInput"
          bsSize="lg"
          spellCheck="false"
          type="text"
          name="userName"
          id="userName"
          placeholder="Name"
          value={user.userName}
          required
          readOnly
        />
      </FormGroup>
      </Col>
      <Col>
      <FormGroup row>
            <Label className="modalLabel" for="userId">
              ID
            </Label>
            <Input
              className="modalInput"
              bsSize="lg"
              spellCheck="false"
              name="userId"
              id="userId"
              placeholder="Id"
              value={user.userId}
              readOnly
              required
            />
          </FormGroup>
      </Col>
     </Row>
      <p className="text-warning" style={{fontSize:'25px',marginLeft:'10px'}}>Enter Email to Delete Your Account</p>
      <div style={{width:'400px', marginLeft:'auto',marginRight:'auto'}}>
      <FormGroup style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <Label  className="modalLabel" style={{fontSize:'50px'}} for="trainerEmail">
              Email
            </Label>
            <Input
              className="modalInput"
              bsSize="lg"
              spellCheck="false"
              name="trainerEmail"
              id="trainerEmail"
              placeholder="Email"
              value={userDetails.trainerEmail}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
      </div>

    {
      emailVerify && (
        <p className="text-danger" style={{fontSize:'30px',marginLeft:'10px'}}>Please Enter the Valid Email</p>
      )
    }
      <p className="text-danger" style={{fontSize:'25px',marginLeft:'10px'}}>Click the Delete Button to Delete Your Account</p>
      <button  className='modalButton' type="submit">Delete</button>
    </Form>
  </div>
  )
}

export default UserModel;

