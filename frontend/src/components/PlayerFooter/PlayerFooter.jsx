import './PlayerFooter.css';
import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import defaultSongCover from '../../assets/playlists_default_cover.png';
import formatDuration from '../../utils/formatDuration';

function PlayerFooter() {
  //consider moving state to global context if needed elsewhere
  const [volumeLevel, setVolumeLevel] = useState(50); 
  const currentVolume = useRef(volumeLevel); 
  
  function handleVolumeChange(e) {
    setVolumeLevel(e.target.value);
  };

  function muteSong() {
    if(volumeLevel > 0) {
      currentVolume.current = volumeLevel;
      setVolumeLevel(0);
    } else {
      setVolumeLevel(currentVolume.current);
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


  return (
    <div className='footerContainer'>
      <div id='songInfoContainer'>
        <img src="src\assets\jeff.jpeg" alt="Song Cover" className='songCover' />
        <div className='songInfo'>
          <p id='songName'>Song Name</p>
          <p id='songArtist'>Artist Name</p>
        </div>
        <button aria-label='Like Song' className='likeBttn noBgBttn'></button>        
      </div>

      <div id='songControls'>
        <audio>
          <source src="path/to/audio/file.mp3" type="audio/mpeg" />`          
        </audio>


        <div id='customPlayer'>
          <button aria-label='shuffle' className='shuffle noBgBttn'></button>
          <button aria-label='previous song' className='prev noBgBttn'></button>
          <button aria-label='play or pause song' className='circularBttn playPause'></button>
          <button aria-label='next song' className='next noBgBttn'></button>
          <button aria-label='repeat Song' className='repeat noBgBttn'></button>
        </div>
        <div id='progressContainer'>
          <p>0:00</p>
          <input aria-label='song progress' type='range' className='progress' min={0} max={100} ></input>
          <p>{formatDuration(currentSong?.duration_ms)}</p>
        </div>

        
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