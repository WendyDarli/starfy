import { useSong } from '../../../context/songContext.jsx';
import useAudio from '../../../hooks/query/useAudio.js';
import { useEffect } from 'react';

function AudioPlayer() {
  const { 
    nowPlaying, 
    settings, 
    isPlaying, 
    setIsPlaying, 
    audioRef, 
    handleAudioEnded, 
    handleTimeUpdate 
  } = useSong();

  // Fetch audio URL
  const isrc = nowPlaying?.external_ids?.isrc || null;
  const { data: audioUrl } = useAudio(isrc);

  // Sync isPlaying with the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateIsPlaying = () => {
      const playing = !audio.paused && !audio.ended && audio.readyState > 2;
      setIsPlaying((prev) => (prev !== playing ? playing : prev));
    };

    audio.addEventListener('play', updateIsPlaying);
    audio.addEventListener('pause', updateIsPlaying);
 

    return () => {
      audio.removeEventListener('play', updateIsPlaying);
      audio.removeEventListener('pause', updateIsPlaying);

    };
  }, [isPlaying, setIsPlaying, audioRef]);

  // Play/pause when isPlaying changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, audioRef]);


  return (
    <audio
      ref={audioRef}
      src={audioUrl}
      autoPlay
      loop={settings.isOnRepeat}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleAudioEnded}
    />
  );
}

export default AudioPlayer;