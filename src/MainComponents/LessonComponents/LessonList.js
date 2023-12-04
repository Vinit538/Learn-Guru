import React, { useState } from 'react';
import { Button, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import LessonSection from './LessonSection';
import '../CardStyle.css'
import '@fontsource/courier-prime/400.css';
import UpdateCourse from '../../TrainerComponent/UpdateCourse';
import { useNavigate } from "react-router-dom";


const LessonsList = ({ lessonsData, onLessonClick, dataUpdate }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  console.log("Lesson List "+lessonsData);
  const navigate = useNavigate();

  const updateLesson=(lsnId)=>{
    navigate(`/updateLessonById/${lsnId}`);
  }


  return (
    <div className='lessonListCard' style={{marginTop:'50px'}}>
      {lessonsData.map((lesson) => (
        <Card
          key={lesson.lsnId}
          className='LessonsCards'
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            borderRadius: 15,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <div style={{marginLeft:'10px'}}>
            <p><span className='lessonHeading'>{lesson.lsnTitle}</span> <br/>
            <span className='lessonSubHeading'>{lesson.lsnSubTitle}</span>
            </p>
          </div>
          <div style={{marginRight:'30px',marginLeft:'auto'}}>
                <Button className='fileButton'>
                <FontAwesomeIcon icon={faFile} 
                 beat size="2xl" 
                 style={{color: "#172844",}}
                 onClick={() => {
                  console.log("Selected Lesson:", lesson);
                  onLessonClick(lesson);}}
                 />
                </Button>
                {dataUpdate === 'update' && (
              <button className='updateLessonButton' onClick={() => updateLesson(lesson.lsnId)}>Update</button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LessonsList;
