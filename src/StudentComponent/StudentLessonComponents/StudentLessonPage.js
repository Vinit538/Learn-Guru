import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import StudentLessonList from './StudentLessonList';
import StudentLessonSection from './StudentLessonSection';

const StudentLessonPage = ({lessonsData}) => {

    const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  
    const handleLessonClick = (clickedLesson) => {
        const lessonIndex = lessonsData.findIndex((l) => l.lsnId === clickedLesson.lsnId);
        setSelectedLessonIndex(lessonIndex);
      };
      
    
      const handlePreviousClick = () => {
        if (selectedLessonIndex > 0) {
          setSelectedLessonIndex(selectedLessonIndex - 1);
        }
      };
    
      const handleNextClick = () => {
        if (selectedLessonIndex < lessonsData.length - 1) {  
          setSelectedLessonIndex(selectedLessonIndex + 1);
        }
      };
  return (
    <div className='LessonPage' style={{marginTop:'50px'}}>
        <Row className='LessonRow'>
            <Col md={8} className='LessonDiv'>
            {lessonsData.length > 0 ? (
              <StudentLessonSection 
              lessonsData={lessonsData}
              selectedLessonIndex={selectedLessonIndex}
              onPreviousClick={handlePreviousClick}
              onNextClick={handleNextClick}
              />
            ) : (
              <h1>No Lesson </h1>
            )}
            </Col>
            <Col md={4}>
                <StudentLessonList lessonsData={lessonsData} onLessonClick={handleLessonClick} />
            </Col>
        </Row>
    </div>
  )
}
export default StudentLessonPage;