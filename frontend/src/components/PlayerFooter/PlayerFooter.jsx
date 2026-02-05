import './PlayerFooter.css';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

//components
import SongInfo from './SongInfo';
import SongControls from './SongControls';
import SongProgress from './SongProgress';
import SongVolumeControls from './SongVolumeControls';

function PlayerFooter({currentSong, isPlaying, setIsPlaying}) { 
  const navigate = useNavigate();
  const url = useLocation();

  //playback
  const [ currTime, setCurrTime ] = useState(0); 
  const [ newTime, setNewTime ] = useState(0);
  const [ isSeeking, setIsSeeking ] = useState(false);

  //audio
  const audioRef = useRef(null);

  useEffect(() => {
    if(audioRef.current){
      !isPlaying ? audioRef.current.pause() : audioRef.current.play();
    };
  }, [isPlaying]);

  function handleTimeUpdate(e){
    if(!isSeeking){
      setCurrTime(e.currentTarget.currentTime);
    }
  };

  const [settings, setSettings] = useState({
    isOnRepeat: false,
    isShufflePlaylist: false,
  });


  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };

  function handleAudioEnded(){

    if(settings.isOnRepeat){
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    //define its fate
    //will repeat?
    //will play random song
    //will play next song?
  };

  const audioHandlers = {
    onTimeUpdate: handleTimeUpdate,
    onEnded: handleAudioEnded,
  };

  function handleLyricsPath(){
    url.pathname === '/lyrics' ? navigate(-1) : navigate('/lyrics');
  };

  return (
    <div className='footerContainer'>
      <SongInfo currentSong={currentSong} />

      <div id='songControls'>
        <audio  ref={audioRef} src={currentSong.audioUrl} autoPlay {...audioHandlers}></audio>
        <SongControls 
          audio={audioRef.current} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying}
          settings={settings}
          toggleSetting={toggleSetting}
        />
        <SongProgress audio={audioRef.current} 
          setNewTime={setNewTime}
          newTime={newTime} 
          isSeeking={isSeeking}
          setCurrTime={setCurrTime}
          currTime={currTime}
          setIsSeeking={setIsSeeking}/>
      </div>

      <div id='extraControls'>
        <button aria-label='open song lyrics' className='lyrics noBgBttn'
          onClick={handleLyricsPath}
        ></button>
        <SongVolumeControls audio={audioRef.current}/>
      </div>


    </div>
  )
}

export default PlayerFooter;