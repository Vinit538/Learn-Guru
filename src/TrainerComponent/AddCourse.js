import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../MainComponents/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faY, faN } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import base_url from "../api/bootapi";
import "./TrainerStyle.css";
import "@fontsource/gabriela";
import "@fontsource/barlow";

const AddCourse = () => {
  const { user } = useAuth();

  const navigate = useNavigate();


  const userId = user.userId;

  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const [submitted, setSubmitted] = useState(false);
  // For new Course
  const [course, setCourse] = useState({
    courseTitle: "",
    courseSubTitle: "",
    courseDescription: "",
    courseSkills: "",
    courseImage: "",
  });
  
  //response data
  const [courseData, setCourseData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const imageBlob = new Blob([e.target.files[0]], { type: "image/jpeg" });
      setCourse({ ...course, [name]: imageBlob });
    } else {
      setCourse({ ...course, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    postCourseDataToServer();
  };

  const handeleToAddLesson = () =>{
    navigate(`/addLesson/${courseData}`);
  }
   
  const handeleToHome = () =>{
    navigate(`/`);
  }
  

  async function postCourseDataToServer() {
    const formData = new FormData();
    formData.append("courseTitle", course.courseTitle);
    formData.append("courseSubTitle", course.courseSubTitle);
    formData.append("courseDescription", course.courseDescription);
    formData.append("courseSkills", course.courseSkills);
    formData.append("courseImage", course.courseImage);
    formData.append("trainerId", userId);

    try {
      const response = await axios.post(`${base_url}/course`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Course Created");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setCourseData(response.data);
      setModal(true);
    } catch (error) {
      toast.error("Course Not Created");
    }
  }

  return (
    <Container style={{ marginTop: "50px" }} className="addCoursePage">
      <h1 className="pageHeading">Add Course</h1>

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

      {/* model to naviagete add lessons to course */}
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        centered="true"
        className="model"
      >
        <ModalHeader toggle={toggleModal} className="modelHeading">
          Course Details
        </ModalHeader>
        <ModalBody>
          <FontAwesomeIcon
            icon={faY}
            size="2xl"
            beat
            style={{ color: "#0dcaf0" }}
          />
          <span className="modelText2 text-info">
            our{" "}
            <span className="modelText1 text-info">
              <u>{course.courseTitle}</u>
            </span>{" "}
            Course Created Sucessfully{" "}
          </span>{" "}
          <br /> <br />
          <div className="modelTextdiv">
            <span className="modelText1">Course Name : </span>
            <span className="modelText2">{course.courseTitle}</span>
          </div>
          <div className="modelTextdiv">
            <span className="modelText1">Subtitle : </span>
            <span className="modelText2">{course.courseSubTitle}</span>
          </div>
          <div className="modelTextdiv">
            <span className="modelText1">Skills : </span>
            <span className="modelText2">{course.courseSkills}</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <div>
            <span className="modalFooterText">
              <FontAwesomeIcon
                icon={faN}
                size="2xl"
                beat
                style={{ color: "#ffc107" }}
              />
              <span className="modelText1 text-warning"> ote :</span>{" "}
              <span className="modelText2">
                {" "}
                Click <u>Add Lesson</u> Button to add Lessons to Your Course
              </span>
            </span>

            <div className="modalButtons">
              <button className="modalButton" onClick={handeleToAddLesson}>
                Add Lesson
              </button>{" "}
              <button className="modalButton" onClick={handeleToHome}>
                Home
              </button>
            </div>
          </div>
        </ModalFooter>
      </Modal>

      <Container className="addCourseForm">
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormGroup row>
            <Label for="courseTitle">Course Title</Label>
            <Input
              bsSize="lg"
              spellCheck="false"
              type="text"
              name="courseTitle"
              id="courseTitle"
              placeholder="Title"
              value={course.courseTitle}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for="courseSubTitle">Course Subtitle</Label>
            <Input
              bsSize="lg"
              spellCheck="false"
              className="mb-3"
              type="text"
              name="courseSubTitle"
              id="courseSubTitle"
              placeholder="Sub Title"
              value={course.courseSubTitle}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for="courseDescription">Description</Label>
            <Input
              bsSize="lg"
              spellCheck="false"
              className="mb-3"
              type="textarea"
              name="courseDescription"
              id="courseDescription"
              placeholder="Description"
              value={course.courseDescription}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for="courseSkills">Skills</Label>
            <Input
              bsSize="lg"
              spellCheck="false"
              className="mb-3"
              type="text"
              name="courseSkills"
              id="courseSkills"
              placeholder="Skills"
              value={course.courseSkills}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for="courseImage">Course Image</Label>
            <Input
              bgSize="lg"
              className="mb-3"
              id="courseImage"
              name="courseImage"
              type="file"
              onChange={handleInputChange}
              accept="image/*" // Restrict to image files
              required
            />
          </FormGroup>
          <button type="submit" className="btnSubmit">
            Submit
          </button>
        </Form>
      </Container>
    </Container>
  );
};

export default AddCourse;
