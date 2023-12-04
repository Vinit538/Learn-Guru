import React, { useState } from 'react';
import { useAuth } from '../MainComponents/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Heart from 'react-animated-heart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart as solidHeart,
  faHeart as regularHeart,
  faUsers,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import '@fontsource/ibm-plex-sans';
import base_url from '../api/bootapi';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseCard = ({ course, statusData }) => {
  // for user
  const { user } = useAuth();

  const [isClick, setClick] = useState(course.likedId.includes(user.userId));
  const navigate = useNavigate();
  //const userLikedCourse = course.likedId.includes(user.userId);
  const [likes, setLikes] = useState(course.courseLikes);

  function likeButton() {
    isClick ? userDisLikesCourse() : userLikesCourse();
  }

  async function userLikesCourse() {
    try {
      await axios.post(`${base_url}/likedCourse/${user.userId}/${course.courseId}`);
      setClick(!isClick);
      setLikes(likes + 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function userDisLikesCourse() {
    try {
      await axios.put(`${base_url}/likedCourse/${user.userId}/${course.courseId}`);
      setClick(!isClick);
      setLikes(likes - 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLearnUnEnroll(){
    try{
      const response = await axios.put(`${base_url}/enrollCourse/${user.userId}/${course.courseId}`);
      toast.success("Dis Enroll Success");
      navigate(`/enrolledCourse`);
    }
    catch(error)
    {
        toast.error("DisEnroll Not Success");
    }
  }



  function handleEnrollButtonClick() {
    navigate(`/enrollCourse/${course.courseId}`);
  }

  const handleLearnButtonClick = () => {
    navigate(`/getEnrolledCourseLesson/${course.courseId}`);
    console.log('Learn Button Click');
  };

  return (
    <div>  
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
    <Card style={{ maxWidth: 350 }} className="courseCard">
      <div className="courseImage">
        <img
          src={`data:image/jpeg;base64,${course.courseImage}`}
          alt="Course image"
          className="courseImage"
          style={{ height: '190px', width: '320px', objectFit: 'cover' }}
        />
        <div className="likeButton">
          <Heart
            isClick={isClick}
            onClick={likeButton}
            className="inactiveColor"
            style={{ color: isClick ? '#ed0202' : 'blue' }}
          />
        </div>
      </div>
      <div className="enrollLikes">
        <div>
          <FontAwesomeIcon icon={faUsers} /> <span> Enrolled {course.courseEnroll} </span>
        </div>
        <div>
          {isClick ? (
            <FontAwesomeIcon icon={solidHeart} style={{ color: '#f00000' }} />
          ) : (
            <FontAwesomeIcon icon={regularHeart} />
          )}
          <span> {likes}</span>
        </div>
      </div>
      <CardBody className="courseCardBody">
        <CardTitle tag="h5" className="courseTitle">
          {course.courseTitle}
        </CardTitle>
        <CardSubtitle tag="h6" className="courseSubTitle">
          {course.courseSubTitle}
        </CardSubtitle>
        <CardText className="courseSkills">
          Skills : <span className="courseSkillText">{course.courseSkills}</span>
        </CardText>
        <div className="cardFooter">
          <div>
          <CardText className="noOfLessons">Units : {course.noOfLessons}</CardText>
          </div>
          <div>
            <FontAwesomeIcon icon={faStar} style={{ color: '#ed0202' }} />
            <span> 4.5</span>
          </div>
        </div>
        <div>
          <div className="buttons">
            {
              course.enrolledId.includes(user.userId) ? (
               <div style={{display:'flex',flexDirection:'row', gap:'10px'}}>
                <button className="courseButton col" onClick={handleLearnButtonClick}>
                Start Learning
              </button>
              <button className="courseButton col" onClick={handleLearnUnEnroll}>
                Un Enroll
            </button>
               </div>
              ):
              (
                <button className="courseButton col" onClick={handleEnrollButtonClick}>
                Enroll
              </button>
              )
            }
          </div>
        </div>
      </CardBody>
    </Card>
    </div>
  );
};

export default CourseCard;
