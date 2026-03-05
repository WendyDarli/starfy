import './SongProgress.css';
import { useEffect, useRef } from 'react';
import { useSong } from '../../../context/songContext';

function SongProgress() {
  
  const {
    currTime,
    duration,
    newTime,
    isSeeking,
    percent,
    handleSeekStart,
    handleSeekChange,
    handleSeekEnd
  } = useSong();

  const sliderRef = useRef(null);

  // Update slider background
  useEffect(() => {
    if (sliderRef.current) {
      const acceleratedPercent = percent === 0 ? 0 : Math.min(percent + 1.5, 100);
      sliderRef.current.style.background = `linear-gradient(to right,
        transparent 0%,
        transparent 6px,
        #ffffff 6px,
        #A2C7FF ${acceleratedPercent}%,
        #2A2A2A ${acceleratedPercent}%,
        #2A2A2A calc(100% - 6px),
        transparent calc(100% - 6px),
        transparent 100%)`;
    }
  }, [percent]);

  const progressProps = {
    value: isSeeking ? newTime : currTime,
    min: 0,
    max: duration || 100,
    step: 0.01,
  };

  const progressHandlers = {
    onMouseDown: handleSeekStart,
    onMouseUp: (e) => handleSeekEnd(e.target.value),
    onChange: handleSeekChange,
  };

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  return (
    <div id="progressContainer">
      <p>{formatTime(currTime)}</p>
      <input
        ref={sliderRef}
        aria-label="song progress"
        type="range"
        className="progress"
        {...progressProps}
        {...progressHandlers}
      />
      <p>{formatTime(duration)}</p>
    </div>
  );
}

export default SongProgress;