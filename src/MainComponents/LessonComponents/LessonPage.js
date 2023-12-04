import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import LessonList from './LessonList';
//import lessonsData from '../CardsComponets/Lesson/lessonsData';
import LessonSection from './LessonSection';
import '../CardStyle.css'


const LessonPage = ({lessonsData,dataUpdate}) => {

  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

    console.log("Lesson Page "+lessonsData);
   

  // const handleLessonClick = (lessonsData) => {
  //   const lessonIndex = lessonsData.findIndex((l) => l.id === lessonsData.lsnId);
  //   setSelectedLessonIndex(lessonIndex);
  // };

  const handleLessonClick = (clickedLesson) => {
    console.log(clickedLesson)
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
    <div >
      <Container>
        <Row className='LessonBody'>
          <Col md={7} className='LessonSection'>
          {lessonsData.length > 0 ? (
              <LessonSection 
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
          <LessonList lessonsData={lessonsData} dataUpdate={dataUpdate} onLessonClick={handleLessonClick} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LessonPage;


