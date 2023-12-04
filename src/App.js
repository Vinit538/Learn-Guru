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
import { isVisible } from "@testing-library/user-event/dist/utils";
import GetEnrolledLesson from "./StudentComponent/GetEnrolledLesson";

function App() {
  const { user } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggletooltip = () => setTooltipOpen(!tooltipOpen);

  const setSignup = () => {
    setIsSignup(!isSignup);
  };

  const toggleSignup =()=>{
    setIsSignup(!isSignup);
  }

  const handleScroll = () => {
    const navMenuButton = document.getElementById("navMenuButton");
    if (navMenuButton) {
      const currentScrollPos = window.scrollY;
  
      if (isOpen) {
        setIsOpen(false);
      }
  
      if (currentScrollPos === 0 ||currentScrollPos < 0) {
        // Scroll to top, show the navMenuButton
        navMenuButton.style.display="block";
      } else if (currentScrollPos > 0) {
        // Scrolling down, hide the navMenuButton
        navMenuButton.style.display="none";
      }
    }
  };
  


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Cleanup the event listener when the component is unmounted
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);



  return (
    <div className="appBody">
      <AuthProvider>
        <Router>
          <div>
            <LearnGuruNavbar isSignup={isSignup} toggleSignup={toggleSignup} />
            <Row>
             
                <div className="lgMenu">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    className="menuButton"
                    onClick={toggle}
                    
                    style={{ marginBottom: "1rem" }}
                  >
                    <div id="navMenuButton">
                    <span className="MenuBarHeading">Menu</span>{" "}
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      beat
                      size="2xl"
                      id="TooltipExample"
                      style={{ color: "#162237" }}
                    />
                    </div>
                  </Button>
                  <Collapse isOpen={isOpen}>
                    <MenuNavbar />
                  </Collapse>
                </div>
              </div>
              
             
              <Col md={12}>
                {/* style={isOpen?{marginLeft:'60px'}:{marginLeft:'10px'}} */}
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
              </Col>
            </Row>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
