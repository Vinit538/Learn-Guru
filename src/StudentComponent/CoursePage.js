import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../MainComponents/AuthContext";
import base_url from "../api/bootapi";
import "./StudentStyle.css";
import CourseCard from "./CourseCard";
import PropagateLoader from "react-spinners/PropagateLoader";


const CoursePage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${base_url}/courses`);
        const coursesData = await response.data;
        console.log(coursesData);
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  if (!courses) {
    return (
      <div>
      <PropagateLoader size={10} color="#002244"  
      className="loader"/>
    </div>
    );
  }

  return (
    <div style={{ marginTop: "50px" }} className="viewCourseBody">
      <h1 className="pageHeading">All Course</h1>
      <div className="allCourseCards">
        {courses.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
