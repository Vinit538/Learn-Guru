import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./MainComponents/AuthContext";
import "./App.css";
import { useState, CSSProperties } from "react";

const LGHome = () => {
  const { user } = useAuth();




  return (
    <div>
      <div className="homeBody">
        <div className="titleContainer">
        
            <span className="titleText">
              <p>Welcome to </p>
            </span>
            <span className="mainHeading">Learn Guru</span>
            <span className="titleText">
              "Embark, on a journey, towards excellence; Discover how each
              lesson ignites your potential"
            </span>
         
        </div>
        <div className="titleIntro"> 
          <p className="lgIntro">
                  "Discover the possibilities of knowledge with our platform, 
                  designed to provide you with enriching and transformative 
                  learning experiences. 
                  Whether you're a student, a working professional or simply someone, 
                  with a curiosity we are dedicated to being your trusted companion on your path, 
                  towards mastery"
          </p>
        </div>
      </div>
    </div>
  );
};
export default LGHome;
