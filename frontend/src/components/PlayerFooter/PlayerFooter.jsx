import './PlayerFooter.css';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import formatDuration from '../../utils/formatDuration';

  const [volumeLevel, setVolumeLevel] = useState(50); 
  const currentVolume = useRef(volumeLevel); 
//components
import SongInfo from './SongInfo';
import SongControls from './SongControls';
import SongProgress from './SongProgress';
function PlayerFooter({currentSong, isPlaying, setIsPlaying}) { 

  //playback
  const [ currTime, setCurrTime ] = useState(0); 
  const [ newTime, setNewTime ] = useState(0);
  const [ isSeeking, setIsSeeking ] = useState(false);

  //audio
  const audioRef = useRef(null);

  
  function handleVolumeChange(e) {
    setVolumeLevel(e.target.value);
  };
  useEffect(() => {
    if(audioRef.current){
      !isPlaying ? audioRef.current.pause() : audioRef.current.play();
    };
  }, [isPlaying]);

  function muteSong() {
    if(volumeLevel > 0) {
      currentVolume.current = volumeLevel;
      setVolumeLevel(0);
    } else {
      setVolumeLevel(currentVolume.current);
    }
  };

  function handleTimeUpdate(e){
    if(!isSeeking){
      setCurrTime(e.currentTarget.currentTime);
    }
  };

  function getVolumeIconClass() {
    if(volumeLevel == 0) {
      return 'muteVolume';

    } else if(volumeLevel > 0 && volumeLevel <= 50) {
      return 'lowVolume';

    } else {
      return 'highVolume';
    } 
  };

  const audioHandlers = {
    onTimeUpdate: handleTimeUpdate,
    onEnded: handleAudioEnded,
  };

  return (
    <div className='footerContainer'>
      <SongInfo currentSong={currentSong} />

      <div id='songControls'>
        <audio  ref={audioRef} src={currentSong.audioUrl} autoPlay {...audioHandlers}></audio>
        <SongControls audio={audioRef.current} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
        <SongProgress audio={audioRef.current} 
          setNewTime={setNewTime}
          newTime={newTime} 
          isSeeking={isSeeking}
          setCurrTime={setCurrTime}
          currTime={currTime}
          setIsSeeking={setIsSeeking}/>
      </div>

      <div id='extraControls'>
        <button aria-label='open playing now view' className='playingViewBttn noBgBttn'></button>
        <button aria-label='open song lyrics' className='lyrics noBgBttn'></button>
        <button aria-label='mute song' className={`noBgBttn + ${getVolumeIconClass(volumeLevel)}`} onClick={muteSong}></button>
        <input aria-label='change volume' type='range' className='volumeControl' min={0} max={100} value={volumeLevel} onChange={handleVolumeChange}></input>
      </div>


    </div>
  )
}

export default PlayerFooter;