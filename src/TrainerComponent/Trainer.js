import React from 'react'
import { Container,Row,Col } from 'reactstrap'
import Menu from './Menu';
import TrainerHome from './TrainerHome';
import ViewCourses from './ViewCourses';
import { Routes, Route, Link } from 'react-router-dom';
import AddCourse from './AddCourse';
import './TrainerStyle.css'
import { AuthProvider } from '../MainComponents/AuthContext';
const Trainer = () => {
  return (
    <div >
     <Row>
            <Col md={2}>
                  <Menu />
            </Col>
            <Col md={10}>
              <Container>
            <Routes>
              <Route path="/trainerHome" element={<TrainerHome />}  />
              <Route path="/trainer/view-courses" element={<ViewCourses />} />
               <Route path="/trainer/addCourse" element={<AddCourse />} />
            </Routes>
            </Container>
            </Col>
        </Row>
    </div>
  )
}

export default Trainer;