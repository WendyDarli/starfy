// This Hook manages the song
// Controls:
// - Song data
// - Actions: play, pause, next, prev, shuffle
// - Status: isPlaying, currentTime, percent, seeking

import { useState, useEffect } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';


function useSongController() {
  // Song ids for ref
  const [currentSongRef, setCurrentSongRef] = useState({
    playlistId: '',
    id: '',
  });

  const [ nowPlaying, setNowPlaying ] = useState(null);

  // Status
  const [isPlaying, setIsPlaying] = useState(false);


  // Query playlist data
  const queryClient = useQueryClient();
  const playlistId = currentSongRef?.playlistId;
  const data = playlistId ? queryClient.getQueryData(['playlist', playlistId]) : undefined;
  const items = data?.tracks?.items ?? [];


  //sets nowPlaying
  useEffect(() => {
    if(currentSongRef.id){
      const currentSongData = items.find((s) => s.id === currentSongRef.id); 
      if(currentSongData){
        setNowPlaying(currentSongData);
      }
    }
  }, [currentSongRef.id, items])




  return {
    currentSongRef,
    setCurrentSongRef,
    isPlaying,
    setIsPlaying,
    nowPlaying,

    items,
    playlistId,
  };
}

export default useSongController;