import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, FormGroup, Input, Label } from "reactstrap";
import { useAuth } from "./AuthContext";
import axios from "axios";
import base_url from "../api/bootapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropagateLoader from "react-spinners/PropagateLoader";

import "./ModalStyle.css";

export const StudentModal = () => {
  const { user } = useAuth();

  const [userDetails, setUserDetails] = useState({
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateDetailsClick = (e) => {
    e.preventDefault();
    updateUserDetails();
  };

  async function updateUserDetails() {
    try {
      await axios.put(`${base_url}/updateStudent/${user.userId}`, userDetails);
      toast.success("Details Updated");
    } catch (error) {
      toast.error("Details Not Updated");
    }
  }

  useEffect(() => {
    const fetchUserByUserId = async () => {
      try {
        const response = await axios.get(
          `${base_url}/studentProfile/${user.userId}`
        );
        console.log(response);
        const Data = await response.data;
        setUserDetails(Data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserByUserId();
  }, [user.userId]);

  if (!userDetails.userId) {
    // Return loading indicator or null until userDetails is loaded
    return (  <Container style={{marginTop:'50px', height:'500px'}}className='viewCourseBody'>
      
      
    <PropagateLoader size={15} color="#002244"  
    className="loader"/>
    <h1 className='loader' style={{textAlign:'center', marginTop:'100px',color:'#002244' }}>Loading...</h1> 
  
  </Container>);
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
      <h1>User Details</h1>
      <Form onSubmit={handleUpdateDetailsClick}>
        <FormGroup row>
          <Label className="modalLabel" for="studentName">
            Name
          </Label>
          <Input
            className="modalInput"
            bsSize="lg"
            spellCheck="false"
            type="text"
            name="studentName"
            id="studentName"
            placeholder="Name"
            value={userDetails.studentName}
            onChange={handleInputChange}
            required
            readOnly
          />
        </FormGroup>
        <Row>
          <Col>
            <FormGroup row>
              <Label className="modalLabel" for="studentEmail">
                Email
              </Label>
              <Input
                className="modalInput"
                bsSize="lg"
                spellCheck="false"
                name="studentEmail"
                id="studentEmail"
                placeholder="Name"
                value={userDetails.studentEmail}
                onChange={handleInputChange}
                readOnly
                required
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
                value={userDetails.userId}
                onChange={handleInputChange}
                readOnly
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup row>
          <Label
            for="studentGender"
            className="col-form-label col-sm-2 modalLabel"
          >
            Gender
          </Label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "15px",
              alignContent: "center",
            }}
          >
            <FormGroup check style={{ marginRight: "15px" }}>
              <Input
                type="radio"
                name="studentGender"
                id="Male"
                value="Male"
                checked={userDetails.studentGender === "Male"}
                onChange={handleInputChange}
              />
              <Label className="modalLabel" check htmlFor="Male">
                Male
              </Label>
            </FormGroup>
            <FormGroup check style={{ marginRight: "15px" }}>
              <Input
                type="radio"
                name="studentGender"
                id="FeMale"
                value="FeMale"
                checked={userDetails.studentGender === "FeMale"}
                onChange={handleInputChange}
              />
              <Label className="modalLabel" check htmlFor="FeMale">
                Female
              </Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="radio"
                name="studentGender"
                id="Other"
                value="Other"
                checked={userDetails.studentGender === "Other"}
                onChange={handleInputChange}
              />
              <Label className="modalLabel" check htmlFor="Other">
                Other
              </Label>
            </FormGroup>
          </div>
        </FormGroup>

        <Row>
          <Col>
            <FormGroup row>
              <Label className="modalLabel" for="studentPhone">
                Phone No
              </Label>
              <Input
                className="modalInput"
                bsSize="lg"
                spellCheck="false"
                type="text"
                name="studentPhone"
                id="studentPhone"
                placeholder="Name"
                value={userDetails.studentPhone}
                onChange={handleInputChange}
                required
                readOnly
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup row>
              <Label className="modalLabel" for="studentDob">
                Birth Date
              </Label>
              <Input
                className="modalInput"
                bsSize="lg"
                spellCheck="false"
                type="Date"
                name="studentDob"
                id="studentDob"
                placeholder="Name"
                value={userDetails.studentDob}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup row>
          <Label className="modalLabel" for="studentAddress">
            Address
          </Label>
          <Input
            className="modalInput"
            bsSize="lg"
            spellCheck="false"
            type="textarea"
            name="studentAddress"
            id="studentAddress"
            placeholder="Name"
            value={userDetails.studentAddress}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <Row>
          <Col>
            <FormGroup row>
              <Label className="modalLabel" for="studentEducation">
                Qualification
              </Label>
              <Input
                className="modalInput"
                bsSize="lg"
                spellCheck="false"
                type="text"
                name="studentEducation"
                id="studentEducation"
                placeholder="Name"
                value={userDetails.studentEducation}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup row>
              <Label className="modalLabel" for="studentBranch">
                Specialization
              </Label>
              <Input
                className="modalInput"
                bsSize="lg"
                spellCheck="false"
                type="text"
                name="studentBranch"
                id="studentBranch"
                placeholder="Filed of Expert"
                value={userDetails.studentBranch}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <p className="text-warning" style={{fontSize:'25px',marginLeft:'10px'}}>Click the Update Button to update the details</p>
        <button  className='modalButton' type="submit">Update</button>
      </Form>
    </div>
  );
};
