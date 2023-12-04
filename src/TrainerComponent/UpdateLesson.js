import React, { useState, useEffect } from 'react';
import { Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter 

} from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faN } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import base_url from "../api/bootapi";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./TrainerStyle.css";
import "@fontsource/gabriela";
import "@fontsource/barlow";

const UpdateLesson = () => {

    const navigate = useNavigate();
   
    const { lsnId } = useParams();

    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);


    const handelToHome=()=>{
        navigate('/trainerHome');
    }

     // to handel update  the course
  const handelBackToCourse = () =>{
    navigate(`/updateCoursePage`);
  }

    const dataUpdate='update';
    const handelUpdateLesson=()=>{
        navigate(`/updateLesson/${lesson.courseId},${dataUpdate}`);
    }
    
    const [lesson, setLesson] = useState({
        lsnTitle: '',
        lsnSubTitle: '',
        lsnDescription: '',
        lsnContent: '',
        lsnContentUrl: '',
    });
   

  
    useEffect(() => {
      const fetchLessonById = async () => {
        try {
          const response = await axios.get(`${base_url}/lesson/${lsnId}`);
          const lessonData =  await response.data;
          setLesson(lessonData);
            
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchLessonById();
    }, [lsnId]);


    const handleInputChange = (e) => {
        const { name, value} = e.target;
        if (name !== "courseId" && name !== "lsnId" && name !== "trainerId") {
        setLesson({...lesson,[name]:value});
     }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(lesson);
        postCourseDataToServer();
    };


    async function postCourseDataToServer() {
        const dataToPost={
          lsnTitle: lesson.lsnTitle,
          lsnSubTitle : lesson.lsnSubTitle,
          lsnDescription : lesson.lsnDescription,
          lsnContent : lesson.lsnContent,
          lsnContentUrl : lesson.lsnContentUrl,
          trainerId : lesson.userId,
          courseId : lesson.courseId,
        };
      try {
        const response = await axios.put(`${base_url}/lesson/${lsnId}`, dataToPost);
        toast.success("Lesson Updated ");
        await new Promise(resolve => setTimeout(resolve, 5000));
        setLesson(response.data);
        setModal(true);
        console.log(response.data);
      } catch (error) {
        toast.error("Lesson Not Updated");
        console.log(error);
      }
    }



  return (
    <Container style={{ marginTop: "50px" }} className="addCoursePage">
    <h1 className="pageHeading">Add Lesson</h1>

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
        Lesson Details
      </ModalHeader>
      <ModalBody>
        <FontAwesomeIcon
          icon={faL}
          size="2xl"
          beat
          style={{ color: "#0dcaf0" }}
        />
        <span className="modelText2 text-info">
          esson {" "}
          <span className="modelText1 text-info">
            <u>{lesson.lsnTitle}</u>
          </span>{" "}
           is Added to Course Sucessfully{" "}
        </span>{" "}
        <br /> <br />
        <div className="modelTextdiv">
          <span className="modelText1">Lesson Name : </span>
          <span className="modelText2">{lesson.lsnTitle}</span>
        </div>
        <div className="modelTextdiv">
          <span className="modelText1">Subtitle : </span>
          <span className="modelText2">{lesson.lsnSubTitle}</span>
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
              Click <u>Add Lesson</u> Button to add Lessons to Your Course
            </span>
          </span>
          <div className='modalButtons'>
            <button className='modalButton' onClick={handelBackToCourse}>
              Course
            </button>{" "}
            <button className='modalButton' onClick={handelUpdateLesson}>
              Update Lesson
            </button>
          </div>
        </div>
      </ModalFooter>
    </Modal>

    <Container className="addCourseForm">
    <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for='lsnTitle'>Lesson Title</Label>
          <Input
            bsSize='lg'
            spellCheck='false'
            type="text"
            name="lsnTitle"
            id="lsnTitle"
            placeholder='Title'
            value={lesson.lsnTitle}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup row>
          <Label for='lsnSubTitle'>Lesson Subtitle</Label>
          <Input
            bsSize='lg'
            spellCheck='false'
            className='mb-3'
            type="text"
            name="lsnSubTitle"
            id="lsnSubTitle"
            placeholder='Sub Title'
            value={lesson.lsnSubTitle}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup row>
          <Label for='lsnDescription'>Description</Label>
          <Input
            bsSize='lg'
            spellCheck='false'
            className='mb-3'
            type="textarea"
            name="lsnDescription"
            id="lsnDescription"
            placeholder='Description'
            value={lesson.lsnDescription}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup row>
          <Label for='lsnContent'>Content</Label>
          <Input
            bsSize='lg'
            spellCheck='false'
            className='mb-3'
            type="textarea"
            name="lsnContent"
            id="lsnContent"
            placeholder='Content'
            value={lesson.lsnContent}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup row>
          <Label for='lsnContentUrl'>URL /Link</Label>
          <Input
            bsSize='lg'
            spellCheck='false'
            className='mb-3'
            type="text"
            name="lsnContentUrl"
            id="lsnContentUrl"
            placeholder='URL'
            value={lesson.lsnContentUrl}
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
export default UpdateLesson;