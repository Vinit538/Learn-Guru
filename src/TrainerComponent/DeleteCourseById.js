import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../MainComponents/AuthContext";
import base_url from '../api/bootapi';
import { useParams } from 'react-router-dom';


const DeleteCourseById = () => {
    const navigate = useNavigate();

    const { courseId } = useParams();

    useEffect(() => {
        console.log(courseId);
        const deleteCourseByCourseId = async () => {
            try {
              const response = await axios.delete(`${base_url}/course/${courseId}`);
              const responseData =  await response.data;
              console.log(responseData);
              navigate('/deleteCourse');
             
            } catch (error) {
              console.error(error);
            }
          };
  
          deleteCourseByCourseId();
    }, [courseId]);

  return (
    <div>

    </div>
  )
}


export default DeleteCourseById;