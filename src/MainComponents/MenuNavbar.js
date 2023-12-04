import React from 'react'
import { Container } from 'reactstrap';
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import './menuNavStyle.css';


const MenuNavbar = () => {
    const { user } = useAuth();
  return (
    
    <div  className='menuNavbar'>
        {user ? null : (<Link className="menuNav" tag="a" to="/">
          Home
        </Link>)}
        
        {user && user.userRole === "Trainer" && (
            <>
          <Link className="menuNav" tag="a" to="/trainerHome">
             Home
             </Link>

          <Link
            className="menuNav"
            tag="a"
            to="/viewCourse"
          >
            Your Course
          </Link>

          <Link
            className="menuNav"
            tag="a"
            to="/addCourse"
          >
            Add Course
          </Link>
            
            <Link
            className="menuNav"
            tag="a"
            to="/updateCoursePage"
          >
            Update Course
          </Link>
          <Link
            className="menuNav"
            tag="a"
            to="/deleteCourse"
          >
            Delete Course
          </Link>
            <Link
            className="menuNav"
            tag="a"
            to="/courses"
          >
            Courses
          </Link>
            </>
        )}
             {user && user.userRole === "Student" && (
            <>
          <Link className="menuNav" tag="a" to="/studentHome">
             Home
             </Link>
          <Link
            className="menuNav"
            tag="a"
            to="/allCourses"
          >
            Course
          </Link>
            
            <Link
            className="menuNav"
            tag="a"
            to="/enrolledCourse"
          >
            Enrolled Course
          </Link>
            <Link
            className="menuNav"
            tag="a"
            to="/courses"
          >
            View Courses
          </Link>
            </>
        )}




      
        <Link
          className="menuNav"
          tag="a"
          to="/addCourse"
        >
          Trainers
        </Link>

    </div>
  )
}

export default MenuNavbar;
