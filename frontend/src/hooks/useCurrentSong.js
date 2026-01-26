import { useState } from 'react';

function useCurrentSong(){
    const [ currentSong, setCurrentSong ] = useState(null);
    const [ isPlaying, setIsPlaying ] = useState(false);

    return {currentSong, setCurrentSong, isPlaying, setIsPlaying};
};

export default useCurrentSong;