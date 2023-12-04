import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
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
import { useParams } from "react-router-dom";

const UpdateCourse = () => {
  const { user } = useAuth();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const userId = user.userId;

  const [imagePreview, setImagePreview] = useState();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  // Add a new state for editable course
  const [editableCourse, setEditableCourse] = useState({
    courseTitle: "",
    courseSubTitle: "",
    courseDescription: "",
    courseSkills: "",
    courseImage: null, // Added for the file object
  });


  const dataUpdate='update';
  const handeleToUpdateLesson=()=>{
    navigate(`/updateCourseLesson/${courseId},${dataUpdate}`);
  }

  const handeletoCourse=()=>{
    navigate(`/viewCourse`)
  }


  // Modify your handleInputChange function to update the editableCourse state
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    // Check if the field is editable (not courseId or userId)
    if (name !== "courseId" && name !== "trainerId") {
      // Update the courseImage state if the field is the file input
      if (name === "courseImage") {
        setEditableCourse({ ...editableCourse, [name]: files[0] });

        // Update the image preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setEditableCourse({ ...editableCourse, [name]: value });
      }
    }
  };

  // Add a function to update the course
  const handleUpdate = async (e) => {
    e.preventDefault();
    await postCourseDataToServer();
    // Redirect or handle success
  };

  async function postCourseDataToServer() {
    const formData = new FormData();
    formData.append("courseTitle", editableCourse.courseTitle);
    formData.append("courseSubTitle", editableCourse.courseSubTitle);
    formData.append("courseDescription", editableCourse.courseDescription);
    formData.append("courseSkills", editableCourse.courseSkills);
    formData.append("courseImage", editableCourse.courseImage);
    formData.append("trainerId", userId);

    try {
      const response = await axios.put(
        `${base_url}/course/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Course Updated");
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setModal(true);
      console.log(response.data);
    } catch (error) {
      toast.error("Course Not Updated");
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${base_url}/course/${courseId}`);
        const courseData = response.data;
        setEditableCourse(courseData);
        setImagePreview(`data:image/jpeg;base64,${courseData.courseImage}`);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [courseId]);

  return (
    <Container style={{ marginTop: "50px" }} className="addCoursePage">
      <h1 className="pageHeading">Update Course</h1>
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
             <u>{editableCourse.courseTitle}</u>
           </span>{" "}
           Course Created Sucessfully{" "}
         </span>{" "}
         <br /> <br />
         <div className="modelTextdiv">
           <span className="modelText1">Course Name : </span>
           <span className="modelText2">{editableCourse.courseTitle}</span>
         </div>
         <div className="modelTextdiv">
           <span className="modelText1">Subtitle : </span>
           <span className="modelText2">{editableCourse.courseSubTitle}</span>
         </div>
         <div className="modelTextdiv">
           <span className="modelText1">Skills : </span>
           <span className="modelText2">{editableCourse.courseSkills}</span>
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
             <span className="modelText2 text-warning">
               {" "}
               Click <u>Update Lessons</u> Button to Update the Lessons in Course
             </span>
           </span>

           <div className="modalButtons">
             <button className="modalButton" onClick={handeleToUpdateLesson}>
               Update Lessons
             </button>{" "}
             <button className="modalButton" onClick={handeletoCourse}>
               Course
             </button>
           </div>
         </div>
       </ModalFooter>
     </Modal> 
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
        <Form onSubmit={handleUpdate} encType="multipart/form-data">
          <FormGroup row>
            <Label for="courseTitle">Course Title</Label>
            <Input
              bsSize="lg"
              spellCheck="false"
              type="text"
              name="courseTitle"
              id="courseTitle"
              placeholder="Title"
              value={editableCourse.courseTitle}
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
              value={editableCourse.courseSubTitle}
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
              value={editableCourse.courseDescription}
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
              value={editableCourse.courseSkills}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup row>
            <Label for="courseImage">Course Image</Label>
            <Input
              bsSize="lg"
              className="mb-3"
              id="courseImage"
              name="courseImage"
              type="file"
              onChange={handleInputChange}
              accept="image/*"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Course Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
          </FormGroup>

          <button type="submit" className="btnSubmit">
            Update Course
          </button>
        </Form>
      </Container>
    </Container>
  );
};

export default UpdateCourse;
