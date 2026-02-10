import './PlayerFooter.css';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

//hooks
import useLyrics from '../../hooks/useLyrics.js';

//components
import SongInfo from './SongInfo';
import SongControls from './SongControls';
import SongProgress from './SongProgress';
import SongVolumeControls from './SongVolumeControls';

function PlayerFooter({currentSong, setCurrentSong, isPlaying, setIsPlaying, nextSong, previousSong, randomSong}) { 
  const navigate = useNavigate();
  const url = useLocation();

  const { data: lyrics, isError } = useLyrics(currentSong);


  //playback
  const [ currTime, setCurrTime ] = useState(0); 
  const [ newTime, setNewTime ] = useState(0);
  const [ isSeeking, setIsSeeking ] = useState(false);

  const audioRef = useRef(null);

  //sync isPlaying state with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateIsPlaying = () => {
    const playing = !audio.paused && !audio.ended && audio.readyState > 2;
    setIsPlaying(prev => (prev !== playing ? playing : prev));
  };

    audio.addEventListener('play', updateIsPlaying);
    audio.addEventListener('pause', updateIsPlaying);
    audio.addEventListener('ended', updateIsPlaying);

    return () => {
      audio.removeEventListener('play', updateIsPlaying);
      audio.removeEventListener('pause', updateIsPlaying);
      audio.removeEventListener('ended', updateIsPlaying);
    };
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }

  }, []);


  function handleTimeUpdate(e){
    if(!isSeeking){
      setCurrTime(e.currentTarget.currentTime);
    }
  };

  const [settings, setSettings] = useState({
      isOnRepeat: false,
      isShufflePlaylist: false,
  });

  //define if is onReapeat or shuffle
  const toggleSetting = (key) => {
      setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
      }));
  };

  useEffect(() => {
    // If we have a song object but the audioUrl is missing/null skip
    if (currentSong && !currentSong.isLoadingAudio && currentSong.audioUrl === null) {
      setCurrentSong(nextSong); 
    }
  }, [currentSong]);

  function handleAudioEnded(){
    
    //repeat
    if(settings.isOnRepeat){
      audioRef.current.currentTime = 0;
      audioRef.current.play();

    //shuffle
    } else if(settings.isShufflePlaylist){
      audioRef.current.pause();
      setCurrentSong(randomSong);
    
    //normal next
    } else {
      audioRef.current.pause();
      setCurrentSong(nextSong);
    }
  };

  const audioHandlers = {
    onTimeUpdate: handleTimeUpdate,
    onEnded: handleAudioEnded,
  };

  function handleLyricsPath(){
    url.pathname === '/lyrics' ? navigate(-1) : navigate('/lyrics');
  };
  const isLyricsPage = url.pathname === '/lyrics';
  const shouldDisableLyricsButton = !lyrics && !isLyricsPage;

  return (
    <div className='footerContainer'>
      <SongInfo currentSong={currentSong} />

      <div id='songControls'>
        <audio  ref={audioRef} src={currentSong?.audioUrl} autoPlay {...audioHandlers}></audio>
        <SongControls 
          audio={audioRef.current} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying}
          settings={settings}
          toggleSetting={toggleSetting}
          setCurrentSong={setCurrentSong}
          nextSong={nextSong}
          previousSong={previousSong}
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
        <button 
          disabled={shouldDisableLyricsButton}
          aria-label='open song lyrics' 
          className={`lyrics noBgBttn 
            ${isLyricsPage ? 'active' : ''}
            ${shouldDisableLyricsButton ? 'disabled' : ''}`}
          onClick={handleLyricsPath}
        />
        <SongVolumeControls audio={audioRef.current}/>
      </div>


    </div>
  )
}

export default PlayerFooter;