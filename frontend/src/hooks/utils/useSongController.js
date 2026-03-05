// This Hook manages the song
// Controls:
// - Song data
// - Actions: play, pause, next, prev, shuffle
// - Status: isPlaying, currentTime, percent, seeking

import { useState, useEffect, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function useSongController(audioRef, settings, setSettings) {
  // Song ids for ref
  const audio = audioRef?.current;
  const [currentSongRef, setCurrentSongRef] = useState({
    playlistId: '',
    id: '',
  });

  // Status
  const [isPlaying, setIsPlaying] = useState(false);

  // Playback slider
  const [currTime, setCurrTime] = useState(0);
  const [newTime, setNewTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Query playlist data
  const queryClient = useQueryClient();
  const playlistId = currentSongRef?.playlistId;
  const data = playlistId ? queryClient.getQueryData(['playlist', playlistId]) : undefined;
  const items = data?.tracks?.items ?? [];
  const currentSongData = items.find((s) => s.id === currentSongRef.id);


  // ====== SONG CONTROLS ============================================================================================

  function handlePlayPause(){
      if (!audio) return;
      setIsPlaying(!isPlaying);  
  };

  // Playback actions
  const playNext = () => {
    const index = items.findIndex((s) => s.id === currentSongRef?.id);
    const next = items[index + 1];
    if (next) setCurrentSongRef({ playlistId, id: next.id });
  };

  const playPrevious = () => {
    const index = items.findIndex((s) => s.id === currentSongRef?.id);
    const prev = items[index - 1];
    if (prev) setCurrentSongRef({ playlistId, id: prev.id });
  };

  const playRandom = () => {
    const otherSongs = items.filter((s) => s.id !== currentSongRef?.id);
    const list = otherSongs.length > 0 ? otherSongs : items;
    const random = list[Math.floor(Math.random() * list.length)];
    setCurrentSongRef({ playlistId, id: random.id });
  };

  function handleOnRepeat() {
    if (settings.isShufflePlaylist) {
        toggleSetting('isShufflePlaylist');
    }
    toggleSetting('isOnRepeat');
  }

  function handleShuffle() {
    if (settings.isOnRepeat) {
        toggleSetting('isOnRepeat');
    }
    toggleSetting('isShufflePlaylist');
  }
  
  
  // ====== SONG PROGRESS ============================================================================================


  // Slider values
  const [duration, setDuration] = useState(0);
  const currentDisplayTime = isSeeking ? newTime : currTime;
  const percent = duration > 0 ? (currentDisplayTime / duration) * 100 : 0;

  // Slider handlers
  const handleTimeUpdate = () => {
    if (!isSeeking && audio) setCurrTime(audio?.currentTime);
  };

  const handleSeekStart = () => setIsSeeking(true);
  const handleSeekChange = (e) => setNewTime(e.target.value);
  const handleSeekEnd = (value) => {
        if (audio) {
            audio.currentTime = value;
            }
    setCurrTime(value);
    setIsSeeking(false);
  };

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
    }));
  };



  // update duration on metadata load
  useEffect(() => {
  
  if (!audio) return;

  const handleLoadedMetadata = () => {
    setDuration(audio.duration);
  };

  audio.addEventListener('loadedmetadata', handleLoadedMetadata);

  return () => {
    audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
  };
}, [audioRef, currentSongRef]); // re-run when audio or song changes

  // ====== AUDIO PLAYER ============================================================================================
  
  // Handle song end
  const handleAudioEnded = useCallback(() => {
    if (settings.isShufflePlaylist) {
      playRandom();
    } else {
      playNext();
    }
  }, [settings, items, currentSongRef]);


  // ====== SONG VOLUME ============================================================================================
  const [volumeLevel, setVolumeLevel] = useState(0.5);
  const previousVolume = useRef(volumeLevel); //remember value before mute

  useEffect(() => {
      if(!audio) return;
      audio.volume = volumeLevel;

  }, [volumeLevel]);


  function handleVolumeChange(e) {
    setVolumeLevel(parseFloat(e.target.value));
  };


  function muteSong() {
    if(!audio) return;
    if(volumeLevel > 0) {
        previousVolume.current = volumeLevel;
        setVolumeLevel(0);
    } else {
        setVolumeLevel(previousVolume.current);
    }
  };

  return {
    currentSongData,
    currentSongRef,
    setCurrentSongRef,
    isPlaying,
    setIsPlaying,
    playNext,
    playPrevious,
    playRandom,
    handleShuffle,
    handleOnRepeat,
    handlePlayPause,


    volumeLevel,
    handleVolumeChange,
    muteSong,


    currTime,
    setCurrTime,
    duration,
    setDuration,
    newTime,
    isSeeking,
    percent,
    handleTimeUpdate,
    handleSeekStart,
    handleSeekChange,
    handleSeekEnd,
    
    handleAudioEnded,
    toggleSetting

  };
}

export default useSongController;