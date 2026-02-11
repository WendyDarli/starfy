import { useState } from 'react';

function useCurrentSong(){
    const [ isPlaying, setIsPlaying ] = useState(false); //true or false
    const [ currentSong, setCurrentSong ] = useState({
        artistsName: [],
        songName: '',
        id: '',
        img: '',
        duration_ms: 0,
        albumName: '',
        external_ids: null,
        audioUrl: undefined,
        index: null,
        isLoadingAudio: false,
    });

    return {currentSong, setCurrentSong, isPlaying, setIsPlaying};
};

export default useCurrentSong;