// This Hook manages the song
// Controls:
// - Song data
// - Actions: play, pause, next, prev, shuffle
// - Status: isPlaying, currentTime, percent, seeking

import { useState, useEffect, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';


function useSongController(audioRef) {
  // Song ids for ref
  const [currentSongRef, setCurrentSongRef] = useState({
    playlistId: '',
    id: '',
  });

  // Status
  const [isPlaying, setIsPlaying] = useState(false);


  // Query playlist data
  const queryClient = useQueryClient();
  const playlistId = currentSongRef?.playlistId;
  const data = playlistId ? queryClient.getQueryData(['playlist', playlistId]) : undefined;
  const items = data?.tracks?.items ?? [];
  const currentSongData = items.find((s) => s.id === currentSongRef.id);


  return {
    currentSongData,
    currentSongRef,
    setCurrentSongRef,
    isPlaying,
    setIsPlaying,

    items,
    playlistId,
  };
}

export default useSongController;