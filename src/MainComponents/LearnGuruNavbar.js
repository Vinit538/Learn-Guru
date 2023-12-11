import React, { useState, useEffect } from "react";
import "@fontsource/yeseva-one";
import "@fontsource/graduate";
import "@fontsource/katibeh";
import "@fontsource/bubblegum-sans";
import "@fontsource/eb-garamond";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import "./LGStyles.css";

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import UserModel from "./UserModel";
import { TrainerModal } from "./TrainerModal";
import { StudentModal } from "./StudentModal";

const LearnGuruNavbar = ({ isSignup, toggleSignup }) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleSignInClick = () => {
    navigate("/log_in", { state: { isSignup: false } });
    toggleSignup(false);
  };

  const handleSignUpClick = () => {
    navigate("/sign_in", { state: { isSignup: true } });
    toggleSignup(true);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [isDMOpen, setIsDMOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDMOpen(!isDMOpen);
  };

  const [modalContent, setModalContent] = useState(null);

  const setProfileContent = () => {
    if (user.userRole === "Trainer") {
      setModalContent(<TrainerModal />);
    } else {
      setModalContent(<StudentModal />);
    }
  };

  const setAccountContent = () => {
    setModalContent(<UserModel 
    />);
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const profileClick = () => {
    setModal(true);
  };

  const handleScroll = () => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos === 0) {
        // Scroll to top, open the navbar
        navbar.style.top = "0";
        // setIsOpen(true);
      } else if (isOpen) {
        // Scrolled down, close the navbar if it's open

        setIsOpen(!isOpen);
      } else if (
        currentScrollPos > 0 &&
        currentScrollPos < window.innerHeight
      ) {
        // Scrolling down or at the bottom of the page, hide the navbar
        navbar.style.top = "-100px";
      }
    }
  };

  useEffect(() => {
    // Attach the event listener for scroll events
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]); // Re-run the effect when the isOpen state changes

  const handleResize = () => {
    // Close the navbar on screen size change
    setIsOpen(false);
  };

  useEffect(() => {
    // Attach the event listener for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

 


  const handleLogoutClick = () => {
    logout();
    // Redirect to the homepage after logout
    navigate('/');
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        centered="true"
        className="model"
        size="lg"
      >
        <ModalHeader toggle={toggleModal} className="modelHeading">
          User Details
        </ModalHeader>
        <ModalBody>{modalContent}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Navbar fixed="top" expand="md" className="navbarStyle" id="navbar">
        <NavbarBrand href="/" className="navBrand">
          <span>
            <img src="../LG.png" className="LGlogo" />{" "}
          </span>{" "}
          <span className="NavbarHeading">Learn Guru</span>
        </NavbarBrand>
        <NavbarToggler
          onClick={toggle}
          className="me-2 my-navbar-toggler navbarToggle"
        >
          <img src="../Navbar.png" alt="Logo" className="navToggle" />{" "}
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav
            style={{ backgroundColor: isOpen ? "#6CB4EE" : "transparent" }}
            className="ms-auto navMenu"
            navbar
          >
            {user ? (
              <>
                {user.userRole === "Trainer" && (
                  <>
                    <NavItem className="navItems">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/trainerHome"
                      >
                        <span className="navSubHeading">Home</span>
                      </Link>
                    </NavItem>
                    <NavItem className="navItems">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/courses"
                      >
                        <span className="navSubHeading">Courses</span>
                      </Link>
                    </NavItem>

                    <UncontrolledDropdown
                      inNavbar
                      direction="down"
                      className="me-2"
                      nav
                    >
                      <DropdownToggle nav className="dropDownMenu">
                        <NavItem className="navItems">
                          <span className="navSubHeading">Trainer</span>
                        </NavItem>
                      </DropdownToggle>
                      <DropdownMenu className="dropMenu">
                        <DropdownItem
                          className="dropMenuButton"
                          onClick={() => navigate("/viewCourse")}
                        >
                          Your Course
                        </DropdownItem>
                        <DropdownItem
                          className="dropMenuButton"
                          onClick={() => navigate("/addCourse")}
                        >
                          Add Course
                        </DropdownItem>
                        <DropdownItem
                          className="dropMenuButton"
                          onClick={() => navigate("/updateCoursePage")}
                        >
                          Update Course
                        </DropdownItem>
                        <DropdownItem
                          className="dropMenuButton"
                          onClick={() => navigate("/deleteCourse")}
                        >
                          Delete Course
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </>
                )}

                {user.userRole === "Student" && (
                  <>
                    <NavItem className="navItems">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/studentHome"
                      >
                        <span className="navSubHeading">Home</span>
                      </Link>
                    </NavItem>
                    <NavItem className="navItems">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/allCourses"
                      >
                        <span className="navSubHeading">Courses</span>
                      </Link>
                    </NavItem>

                    <UncontrolledDropdown
                      inNavbar
                      direction="down"
                      className="me-2"
                      nav
                    >
                      <DropdownToggle nav className="dropDownMenu">
                        <NavItem className="navItems">
                          <span className="navSubHeading">Student</span>
                        </NavItem>
                      </DropdownToggle>
                      <DropdownMenu className="dropMenu">
                        <DropdownItem
                          className="dropMenuButton"
                          onClick={() => navigate("/enrolledCourse")}
                        >
                          Enrolled
                        </DropdownItem>
                        <DropdownItem
                          className="dropMenuButton"
                          onClick={() => navigate("/allCourses")}
                        >
                          Courses
                        </DropdownItem>

                        {/* <DropdownItem className='dropMenuButton'>Update Course</DropdownItem>
                    <DropdownItem className='dropMenuButton'>Delete Course</DropdownItem> */}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </>
                )}
                <UncontrolledDropdown
                  inNavbar
                  direction="down"
                  className="me-2"
                  nav
                  onMouseOver={toggleDropdown}
                  onMouseOut={toggleDropdown}
                >
                  <DropdownToggle nav>
                    {user.userRole === "Trainer" && (
                      <FontAwesomeIcon
                        icon={faUserTie}
                        size="2xl"
                        className="userIcon"
                      />
                    )}
                    {user.userRole === "Student" && (
                      <FontAwesomeIcon
                        icon={faUserGraduate}
                        size="2xl"
                        className="userIcon"
                      />
                    )}
                    <span className="userName">{user.userName}</span>
                  </DropdownToggle>
                  <DropdownMenu
                    className="dropMenu"
                    right
                    isOpen={isDMOpen}
                    toggle={toggleDropdown}
                  >
                    <DropdownItem
                      onClick={() => {
                        setProfileContent();
                        toggleModal();
                      }}
                      className="dropMenuButton"
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        setAccountContent();
                        toggleModal();
                      }}
                      className="dropMenuButton"
                    >
                      Account
                    </DropdownItem>
                    <DropdownItem className="dropMenuButton">
                      Dashboard
                    </DropdownItem>
                    <DropdownItem
                      onClick={handleLogoutClick}
                      className="dropMenuButton"
                    >
                      Logout
                    </DropdownItem>
                    {/* <DropdownItem onClick={logout} className="dropMenuButton">
                      <Link style={{ textDecoration: "none" }} to="/">
                        Logout
                      </Link>
                    </DropdownItem> */}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              <>
                <NavItem className="navItems">
                  <Link style={{ textDecoration: "none" }} to="/">
                    <span className="navSubHeading">Home</span>
                  </Link>
                </NavItem>

                <NavItem className="navItems">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/sign_in"
                    onClick={handleSignUpClick}
                  >
                    <span className="navSubHeading">Sign In</span>
                  </Link>
                </NavItem>
                <NavItem className="navItems">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/log_in"
                    onClick={handleSignInClick}
                    className="menuLink"
                  >
                    Log In
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default LearnGuruNavbar;
