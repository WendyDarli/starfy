import { useEffect, useRef, useState } from 'react';

function SongProgress({ audio, currTime, setCurrTime, newTime, setNewTime, isSeeking, setIsSeeking }){

  const duration = audio?.duration || 0;
    function handleSeekStart(){
      setIsSeeking(true);
    };

    function handleSeekChange(e){
      setNewTime((e.target.value));
    };

    function handleSeekEnd(e){ 
      const value = e.target.value;
      audio.currentTime = value;
      setCurrTime(value);
      setIsSeeking(false);

    };

    const progressHandlers = {
      onMouseDown: handleSeekStart,
      onMouseUp: handleSeekEnd,
      onChange: handleSeekChange,
    };

    const progressProps = {
      value: isSeeking ? newTime : currTime,
      min: 0,
      max: duration || 100,
      step: 0.01,
    };

    function formatTime(seconds){
      if (!Number.isFinite(seconds)) return "0:00";

      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);

      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return(
      <div id='progressContainer'>
          <p>{formatTime(currTime)}</p>
        <input
          aria-label='song progress'
          type='range'
          className='progress'
          {...progressProps}
          {...progressHandlers}

        ></input>
        <p>{formatTime(duration)}</p>
      </div>
    );
};

export default SongProgress;