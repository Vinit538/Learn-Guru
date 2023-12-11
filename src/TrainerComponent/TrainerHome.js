import React from 'react';
import { Container, Card, Button } from 'reactstrap';
import '../App.css'
import { useAuth } from '../MainComponents/AuthContext';


export default function  TrainerHome() {
  const {user}=useAuth();

  return (
    <div>
      <div className="homeBody">
        <div className="titleContainer">
        
            <span className="titleText">
              <p>Hello, {user.userName}</p>
            </span>
            <span className="mainHeading">Trainer</span>
            <span className="titleText">
              "Embark, on a journey, towards excellence"
            </span>
         
        </div>
        <div className="titleIntro"> 
          <p className="lgIntro">
          "Welcome to your Training Hub at Learn Guru. We have created this space exclusively for you, 
          recognizing your role as an invaluable educator." 
          </p>
        </div>
      </div>
    </div>
  );
};

 