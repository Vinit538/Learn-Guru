import React, { useState } from 'react';
import { Button, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import '@fontsource/courier-prime/400.css';
import '../StudentStyle.css';


const StudentLessonList = ({lessonsData,onLessonClick}) => {
  const [selectedLesson, setSelectedLesson] = useState(null);


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
            // border: '1px solid black',
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
                  onLessonClick(lesson);}}
                 />
                </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default StudentLessonList;