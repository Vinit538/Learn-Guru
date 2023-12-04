import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import base_url from '../api/bootapi';
import { useParams } from 'react-router-dom';
import { useAuth } from "../MainComponents/AuthContext";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './StudentStyle.css'
import "@fontsource/gabriela";
import "@fontsource/barlow";
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label
  } from "reactstrap";

const EnrollCousePage = () => {

    const { courseId } = useParams();

    const { user } = useAuth();
    const navigate = useNavigate();



    const [student , setStudent]=useState({
        studentName:'',
        studentEmail:'',
    })

    const handleInputChange=(e)=>{
        const { name, value} = e.target;
        setStudent({ ...student, [name]: value });
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        enrollCourse();
    }

    async function enrollCourse(){
        try{
         if(user.userName===student.studentName && user.userEmail === student.studentEmail)
         {
          const response = await axios.post(`${base_url}/enrollCourse/${user.userId}/${courseId}`);
          toast.success("Course Enrolled ")
          await new Promise(resolve => setTimeout(resolve, 5000));
          navigate(`/enrolledCourse`);
         }
         else{
          toast.warning("Enter valid Details")
         }
        }
        catch(error){
          toast.error("Course Not Enrolled")
        }
      }

  return (
    <Container style={{ marginTop: "50px" }} className="addCoursePage">
      <h1 className="pageHeading">Enroll Course</h1>

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
      <Container className="addCourseForm">
        <Form onSubmit={handleSubmit} >
          <FormGroup row>
            <Label for="studentName">Name</Label>
            <Input
              bsSize="lg"
              spellCheck="false"
              type="text"
              name="studentName"
              id="studentName"
              placeholder="Name"
              value={student.studentName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for="studentEmail">Email</Label>
            <Input
              bsSize="lg"
              spellCheck="false"
              className="mb-3"
              type="Email"
              name="studentEmail"
              id="studentEmail"
              placeholder="Email"
              value={student.studentEmail}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <button type="submit" className="btnSubmit">
            Submit
          </button>
        </Form>
      </Container>
    </Container>
  )
}
export default EnrollCousePage;

