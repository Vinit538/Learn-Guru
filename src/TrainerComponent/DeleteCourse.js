import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../MainComponents/AuthContext";
import base_url from '../api/bootapi';
import TrainerCourseCard from './TrainerCourseCard';
import { Container } from 'reactstrap';
import './TrainerStyle.css';
import PropagateLoader from "react-spinners/PropagateLoader";


const DeleteCourse = () => {


    const {user}=useAuth();
    const [courses, setCourses] = useState(null);
    
    const data='delete';
   
    const userId=user.userId;
   
   console.log(courses)
    useEffect(() => {
      const fetchCourseByUserId = async () => {
        try {
          const response = await axios.get(`${base_url}/courses/${userId}`);
          const coursesData =  await response.data;
          console.log("get Courses "+coursesData);
          setCourses(coursesData);
          console.log(courses);
         
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchCourseByUserId();
    }, [userId]);
  
    if (!courses) {
      return (
        <div>
        <PropagateLoader size={10} color="#002244"  
        className="loader"/>
      </div>
      );
    }
  return (
    <div style={{marginTop:'50px'}}className='viewCourseBody' >
        <h1>All Course</h1>
        <div className='allCourseCards'>
    {courses.map(course => (
<TrainerCourseCard key={course.courseId} course={course} data={data} />
    ))}
    </div>
    </div>
  )
}


export default DeleteCourse;