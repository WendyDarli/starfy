// This Hook manages the song playback Info 
// Retrieves the currently playing song from the React Query cache
// using a stored song reference (playlistId + songId).

import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function useSongController() {
  // Song ids for ref
  const [currentSongRef, setCurrentSongRef] = useState({
    source: '',
    sourceId: '',
    id: '',
  });

  // Song object used by the player UI
  const [ nowPlaying, setNowPlaying ] = useState(null);
  
  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);


  // Query playlist data
  const queryClient = useQueryClient();
  const sourceId = currentSongRef?.sourceId;


  // Retrieve cached data depending on the page type
  const data = 
    currentSongRef?.source === 'search' 
      ? queryClient.getQueryData(['searchResults', sourceId]) 
      : queryClient.getQueryData(['playlist', sourceId]);


  // Normalize data structure (search uses paginated results)
  const items =
  currentSongRef?.source === 'search'
    ? data?.pages?.flatMap(page => page.tracks.items) ?? []
    : data?.tracks?.items ?? [];

 
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
    sourceId,
  };
}

export default useSongController;