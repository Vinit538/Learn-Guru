// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./MainComponents/AuthContext";
import LearnGuruNavbar from "./MainComponents/LearnGuruNavbar";
import UserForm from "./MainComponents/UserForm";
// import Student from "./Components/Student";
import LGHome from "./LGHome";
// import RecipeReviewCard from "./CardsComponets/RecipeReviewCard";
import "./App.css";

import { Container, Tooltip, Row, Button, Collapse, Col } from "reactstrap";
import AddCourse from "./TrainerComponent/AddCourse";
import TrainerHome from "./TrainerComponent/TrainerHome";
import ViewCourses from "./TrainerComponent/ViewCourses";
import GetCourseByCourseId from "./MainComponents/GetCourseByCourseId";
import MenuNavbar from "./MainComponents/MenuNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DeleteCourse from "./TrainerComponent/DeleteCourse";
import DeleteCourseById from "./TrainerComponent/DeleteCourseById";
import AddLesson from "./TrainerComponent/AddLesson";
import UpdateCourse from "./TrainerComponent/UpdateCourse";
import UpdateCourseLesson from "./TrainerComponent/UpdateCourseLesson";
import UpdateLesson from "./TrainerComponent/UpdateLesson";
import UpdateCoursePage from "./TrainerComponent/UpdateCoursePage";
import GetAllCourse from "./TrainerComponent/GetAllCourse";
import StudentHome from "./StudentComponent/StudentHome";
import CoursePage from "./StudentComponent/CoursePage";
import EnrollCousePage from "./StudentComponent/EnrollCousePage";
import EnrolledCourse from "./StudentComponent/EnrolledCourse";
import GetEnrolledLesson from "./StudentComponent/GetEnrolledLesson";
import UserLogIn from "./MainComponents/UserLogIn";
function App() {


  const { user } = useAuth();
  const [isSignup, setIsSignup] = useState(false);


  const setSignup = () => {
    setIsSignup(!isSignup);
  };

  const toggleSignup =()=>{
    setIsSignup(!isSignup);
  }

  return (
    <div className="appBody">
      <AuthProvider>
        <Router>
          <div>
            <LearnGuruNavbar isSignup={isSignup} toggleSignup={toggleSignup} />
                <Routes>
                  <Route path="/" element={<LGHome />} />
                  <Route
                    path="/log_in"
                    element={
                      <UserForm
                        isSignup={false}
                        toggleSignup={setSignup}
                      />
                    }
                  />
                  <Route
                    path="/sign_in"
                    element={
                      <UserForm
                        isSignup={true}
                        toggleSignup={setSignup}
                      />
                    }
                  />
                  <Route path="/newlog_in" element={<UserLogIn />} />

                  <Route path="/addCourse" element={<AddCourse />} />
                  <Route path="/trainerHome" element={<TrainerHome />} />
                  <Route path="updateCoursePage" element={<UpdateCoursePage />} />
                  <Route path="/courses" element={<GetAllCourse />} />

                  <Route path="/viewCourse" element={<ViewCourses />} />
                  <Route path="/deleteCourse" element={<DeleteCourse />} />
                  <Route
                    path="/getCourse/:courseId"
                    element={<GetCourseByCourseId />}
                  />
                   <Route
                    path="/addLesson/:courseId"
                    element={<AddLesson />}
                  />
                  <Route
                    path="/updateCourse/:courseId"
                    element={<UpdateCourse />}
                  />

                  <Route
                    path="/updateCourseLesson/:id" 
                    element={<UpdateCourseLesson />}
                  />

                  <Route
                    path="/updateLessonById/:lsnId"
                    element={<UpdateLesson />}
                  />

                  <Route
                    path="/deleteCourse/:courseId"
                    element={<DeleteCourseById />}
                  />
                    {/* Student Route Link */}
                  <Route path="/studentHome" element={<StudentHome />} />
                  <Route path="/allCourses"  element={<CoursePage />} />
                  <Route
                    path="/enrollCourse/:courseId"
                    element={<EnrollCousePage />}
                  />
                  <Route path="/enrolledCourse" element={<EnrolledCourse />} />
                  
                  <Route
                        path="/getEnrolledCourseLesson/:courseId"
                        element={ <GetEnrolledLesson />  }
                  />


                </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
