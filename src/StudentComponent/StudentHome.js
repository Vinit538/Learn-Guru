import React from 'react';
import { Container, Card, Button } from 'reactstrap';
import '../App.css'
import { useAuth } from '../MainComponents/AuthContext';

const StudentHome = () => {
    const {user}=useAuth();

    return (
      <div>
         <div className="homeBody">
        <div className="titleContainer">
        
            <span className="titleText">
              <p>Hello, {user.userName}</p>
            </span>
            <span className="mainHeading">Student</span>
            <span className="titleText">
              "Embark, on a journey, towards excellence"
            </span>
         
        </div>
        <div className="titleIntro"> 
          <p className="lgIntro">
          " Prepare for an adventure as you enter a sanctuary tailored exclusively for you. 
          As you embark on this journey allow the content as Student to unfold with opportunities, for success. "
          </p>
        </div>
      </div>
      </div>
    );
  };
export default StudentHome;