import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Heart from 'react-animated-heart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeart as regularHeart, faUsers, faStar} from '@fortawesome/free-solid-svg-icons';
import './TrainerStyle.css';
import { useAuth } from '../MainComponents/AuthContext';
import '@fontsource/ibm-plex-sans';

const TrainerCourseCard = ({ course,data }) => {
  const [isClick, setClick] = useState(false);
  //for user
  const {user}=useAuth();
  const navigate = useNavigate();

  // to handel delete 
  const handleDeleteButtonClick = () => {
    navigate(`/deleteCourse/${course.courseId}`);
  };
  
 // to handel update  the course
  const handleButtonToUpdate = () =>{
    navigate(`/updateCourse/${course.courseId}`);
  }

  // set the command for update 
  const dataUpdate='update';
  // to update the lesson in course
  const handleButtonToUpdateLesson = ()=>{
      navigate(`/updateCourseLesson/${course.courseId},${dataUpdate}`);
  }

  // to add lesson if the course is created
  const handleButtonToAddLesson=()=>{
    navigate(`/addLesson/${course.courseId}`);
  }

  // to get the course by the course id 
  const handleButtonClick = () => {
    navigate(`/getCourse/${course.courseId}`);
  };
  

  return (
      <Card style={{ maxWidth: 350}} className="courseCard" >
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
              onClick={() => setClick(!isClick)}
              className="inactiveColor"
              style={{ color: isClick ? '#ed0202' : 'blue' }}
            />
          </div>
        </div>
        <div className="enrollLikes" >
          <div>
            <FontAwesomeIcon icon={faUsers} /> <span> Enrolled {course.courseEnroll} </span>
          </div>
          <div>
            {isClick ? (
              <FontAwesomeIcon icon={solidHeart} style={{ color: '#f00000' }} />
            ) : (
              <FontAwesomeIcon icon={regularHeart} />
            )}
            <span> {course.courseLikes}</span>
          </div>
        </div>
        <CardBody className="courseCardBody">
          <CardTitle tag="h6" className='courseTitle'>{course.courseTitle}</CardTitle>
          <CardTitle tag="h6" className="courseSubTitle">
            {course.courseSubTitle}
          </CardTitle>
          <CardText className='courseSkills'>Skills : <span className='courseSkillText'>{course.courseSkills}</span></CardText>
          <div className="cardFooter">
            <div>         
               <CardText className='noOfLessons'>Units : {course.noOfLessons}</CardText>
            </div>
            <div>
              <FontAwesomeIcon icon={faStar} style={{ color: '#ed0202' }} />
              <span> {course.courseRating}</span>
            </div>
          </div>
           <div>
            <div className='buttons'>
            <button className="courseButton col" onClick={handleButtonClick}>
                View
            </button>
            {data ==='delete'&&( <button className="courseButton" onClick={handleDeleteButtonClick}>
                Delete
            </button>
            )}
            {
              data === 'update' && (
              <>
                <button className="courseButton col" onClick={handleButtonToUpdate}>
            Update Course
            </button>
            <button className="courseButton col" onClick={handleButtonToUpdateLesson}>
               Update Lessons
            </button>
            <button className="courseButton col" onClick={handleButtonToAddLesson}>
                Add Lessons
            </button>
              </>
              )
            }
            
            </div>
          </div>
        </CardBody>
      </Card>
  );
};

export default TrainerCourseCard;
