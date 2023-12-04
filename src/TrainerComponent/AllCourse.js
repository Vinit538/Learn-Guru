import React, { useState } from 'react'
import Course from './Course';

const AllCourse = () => {
    const[courses,setCourses]=useState([
        {title :"Java Course",description:'this is demo course'},
        {title :"Django Course",description:'this is demo course'},
        {title :"React JS Course",description:'this is demo course'},
        {title :"My Sql Course",description:'this is demo course'}
    ])
  return (
    <div>
        <h1>AllCourses</h1>
        <p>List of courses are as follows</p>
        {
            courses.length > 0 
            ? courses.map((item)=><Course course={item}/>)
            :"No Courses"
        }
    </div>
  )
}

export default AllCourse;
