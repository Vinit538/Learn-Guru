import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../MainComponents/AuthContext";
import base_url from '../api/bootapi';
import TrainerCourseCard from './TrainerCourseCard';
import { Container } from 'reactstrap';
import './TrainerStyle.css';
import PropagateLoader from "react-spinners/PropagateLoader";


const GetAllCourse = () => {
    const {user}=useAuth();
    const [courses, setCourses] = useState(null);
    
   
    const userId=user.userId;
   
   console.log(courses)
    useEffect(() => {
      const fetchCourseByUserId = async () => {
        try {
          const response = await axios.get(`${base_url}/courses`);
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
      return (  <Container style={{marginTop:'50px', height:'500px'}}className='viewCourseBody'>
      
      
      <PropagateLoader size={15} color="#002244"  
      className="loader"/>
      <h1 className='loader' style={{textAlign:'center', marginTop:'100px',color:'#002244' }}>Loading...</h1> 
    
    </Container>);
      
    }
  
    return (
        <div style={{marginTop:'50px'}}className='viewCourseBody' >
          <h1 className='pageHeading'>All Course</h1>
          <div className='allCourseCards'>
      {courses.map(course => (
        <TrainerCourseCard  key={course.courseId} course={course} />
      ))}
      </div>
      </div>
    )
  }

export default GetAllCourse;