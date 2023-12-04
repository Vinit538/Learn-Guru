import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause,faChevronRight,faChevronCircleLeft, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import { Button } from 'reactstrap';
import '../CardStyle.css';

const LessonSection = ({ lessonsData, selectedLessonIndex, onPreviousClick, onNextClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
 
  const ref = useRef(null);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const handlePauseVideo = () => {
    setIsPlaying(false);
  };

  const handleVideoProgress = (state) => {
    // Uncomment the following line to log the current playback time
    // console.log('Current time:', state.playedSeconds);
  };

  //  // Check if selectedLessonIndex is within valid range
   if (selectedLessonIndex < 0 || selectedLessonIndex >= lessonsData.length) {
    return <div>No lesson selected</div>;
  }

  const currentLesson = lessonsData[selectedLessonIndex];

  return (
    <div>
      <div className='videoCard container-fluid'>
      {currentLesson && currentLesson.lsnContentUrl && (
          <ReactPlayer
            url={currentLesson.lsnContentUrl}
            controls={true}
            playing={isPlaying}
            onProgress={handleVideoProgress}
            className='reactPlayer'
            borderRadius='20px'
          />
        )}
        <div className='videoControls'>
          {isPlaying ? (
            <FontAwesomeIcon icon={faCirclePause} onClick={handlePauseVideo} size='2xl' style={{ color: '#dadde1' }} />
          ) : (
            <FontAwesomeIcon onClick={handlePlayVideo} size='2xl' icon={faCirclePlay} style={{ color: '#dadde1' }} />
          )}
        </div>
      </div>
      
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
        <Button className='directionButton' onClick={onPreviousClick} disabled={selectedLessonIndex === 0}>
         <FontAwesomeIcon icon={faChevronLeft} style={{color: "white",}} /> Previous 
        </Button>
        <Button  className='directionButton' onClick={onNextClick} disabled={selectedLessonIndex === lessonsData.length - 1}>
          Next   <FontAwesomeIcon icon={faChevronRight} style={{color: "white",}} />
        </Button>
      </div>
      <h2>{currentLesson.lsnTitle}</h2>
      <h2>{currentLesson.lsnSubTitle}</h2>
    </div>
  );
};

export default LessonSection;