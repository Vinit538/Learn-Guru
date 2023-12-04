import React, { useState, useEffect } from "react";
import "@fontsource/yeseva-one";
import "@fontsource/graduate";
import "@fontsource/katibeh";
import "@fontsource/bubblegum-sans";
import "@fontsource/eb-garamond";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie,faUserGraduate} from "@fortawesome/free-solid-svg-icons";
import "./LGStyles.css"; // Import custom styles

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

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
      }
      else if (currentScrollPos > 0 && currentScrollPos < window.innerHeight) {
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

  return (
    <div>
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
                <NavItem className="navItems">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/"
                  >
                    <span className="navSubHeading">Home</span>
                  </Link>
                </NavItem>

                {user.userRole === "Trainer" && (
                  <NavItem className="navItems">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/trainerHome"
                    >
                      <span className="navSubHeading">Trainer</span>
                    </Link>
                  </NavItem>
                )}

                {user.userRole === "Student" && (
                  <NavItem className="navItems">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/studentHome"
                    >
                      <span className="navSubHeading">Student</span>
                    </Link>
                  </NavItem>
                )}

                <UncontrolledDropdown
                  inNavbar
                  direction="down"
                  className="me-2"
                >
                  <DropdownToggle nav>
                    {user.userRole === "Trainer" && (
                          <FontAwesomeIcon
                          icon={faUserTie}
                          size="2xl"
                          //  style={{ color: "#213454" }}
                          className="userIcon"
                          />
                    )}
                   
                    {user.userRole === "Student" &&(
                      <FontAwesomeIcon 
                      icon={faUserGraduate} 
                      size="2xl" 
                      // style={{ color: "#213454" }}
                      className="userIcon"
                    
                      />
                    )}
                    
                    <span className="userName">{user.userName}</span>
                  </DropdownToggle>
                  <DropdownMenu className="dropMenu">
                    <DropdownItem>
                      <p>{user.userId}</p>
                    </DropdownItem>
                    <DropdownItem>Profile</DropdownItem>
                    <DropdownItem>Account</DropdownItem>
                    <DropdownItem>Dashboard</DropdownItem>
                    <DropdownItem onClick={logout}>
                      <Link to="/">Logout</Link>
                    </DropdownItem>
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
                  >
                    <span className="navSubHeading">Log In</span>
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
