import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCirclePlay,
  faCirclePause,
  faChevronRight,
  faChevronCircleLeft,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import { Button, Container } from "reactstrap";
import "../StudentStyle.css";
import "video-react/dist/video-react.css";
import { Player, BigPlayButton } from "video-react";

const StudentLessonSection = ({
  lessonsData,
  selectedLessonIndex,
  onPreviousClick,
  onNextClick,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const ref = useRef(null);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const handlePauseVideo = () => {
    setIsPlaying(false);
  };

  const handleVideoProgress = (state) => { 

  };

  if (selectedLessonIndex < 0 || selectedLessonIndex >= lessonsData.length) {
    return <div>No lesson selected</div>;
  }

  const currentLesson = lessonsData[selectedLessonIndex];

  return (
    <div style={{ marginTop: "50px" }} className="container-fluid StudentLessonSection">
      <div className="container-fluid videoBox">
      <div className="videoSection container-fluid" >
        {currentLesson && currentLesson.lsnContentUrl && (
          <ReactPlayer
            url={currentLesson.lsnContentUrl}
            controls={true}
            playing={isPlaying}
            className="videoPlayer container-fluid"
          />
        )}
      <div className='videoControls '>
          {isPlaying ? (
            <FontAwesomeIcon icon={faCirclePause} onClick={handlePauseVideo} size='4x' style={{ color: '#dadde1' }} />
          ) : (
            <FontAwesomeIcon onClick={handlePlayVideo} size='4x' icon={faCirclePlay} style={{ color: '#dadde1' }} />
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





      </div>
      <h2>{currentLesson.lsnTitle}</h2>
      <h2>{currentLesson.lsnSubTitle}</h2>
    </div>
  );
};
export default StudentLessonSection;
