import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../MainComponents/AuthContext";
import base_url from '../api/bootapi';
import './StudentStyle.css';
import CourseCard from './CourseCard';
import PropagateLoader from "react-spinners/PropagateLoader";


const EnrolledCourse = () => {
    const {user}=useAuth();
    const [courses, setCourses] = useState(null);
    
   
    const userId=user.userId;
   
   console.log(courses)
    useEffect(() => {
      const fetchEnrolledCourseByUserId = async () => {
        try {
          const response = await axios.get(`${base_url}/enrollCourses/${userId}`);
          const coursesData =  await response.data;
          setCourses(coursesData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchEnrolledCourseByUserId();
    }, [userId]);
  
    if (!courses) {
      return (
        <div>
        <PropagateLoader size={10} color="#002244"  
        className="loader"/>
      </div>
      );
    }
  
    const statusData='enrolled';
  return (
    <div style={{ marginTop: "50px" }} className="viewCourseBody">
      <h1 className="pageHeading"> Your Enrolled Course</h1>
      <div className="allCourseCards">
        {courses.map((course) => (
          <CourseCard key={course.courseId} course={course} statusData={statusData} />
        ))}
      </div>
    </div>
  )
}

export default EnrolledCourse;
