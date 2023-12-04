import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import base_url from '../api/bootapi';
import LessonPage from '../MainComponents/LessonComponents/LessonPage';
import './TrainerStyle.css'
import PropagateLoader from "react-spinners/PropagateLoader";
import { Container } from 'reactstrap';

const UpdateCourseLesson = () => {

    const { id } = useParams(); // This will contain the courseId and dataTr

    // You can split the parameters using ',' if needed
    const [courseId, dataUpdate] = id.split(',');

    const [lessonsData, setLessonsData] = useState();

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


    if (!lessonsData) {
      return (  <Container style={{marginTop:'50px', height:'500px'}}className='viewCourseBody'>
      
      
      <PropagateLoader size={15} color="#002244"  
      className="loader"/>
      <h1 className='loader' style={{textAlign:'center', marginTop:'100px',color:'#002244' }}>Loading...</h1> 
    
    </Container>);
      }
  
  
    return (
      <div>
         <LessonPage lessonsData={lessonsData} dataUpdate={dataUpdate} />
      </div>
  )
}

export default UpdateCourseLesson;
