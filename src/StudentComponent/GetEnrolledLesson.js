import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import base_url from '../api/bootapi';
import StudentLessonPage from './StudentLessonComponents/StudentLessonPage';
import PropagateLoader from "react-spinners/PropagateLoader";

const GetEnrolledLesson = () => {

    const [lessonsData, setLessonsData] = useState();
    const { courseId } = useParams();
    
    useEffect(() => {
        console.log(courseId);
      const fetchLessonsById = async () => {
        try {
          const response = await axios.get(`${base_url}/lessons/${courseId}`);
          const lessonData =  await response.data;
          console.log("get lessons "+lessonData);
          setLessonsData(lessonData);
          console.log(lessonsData);
         
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchLessonsById();
    }, [courseId]);
    
    console.log(lessonsData);
  
    if (!lessonsData) {
      return (
        <div>
        <PropagateLoader size={10} color="#002244"  
        className="loader"/>
      </div>
      );
    }

  return (
    <div>
        <StudentLessonPage lessonsData={lessonsData} />
    </div>
  )
}


export default GetEnrolledLesson;