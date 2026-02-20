import { useState } from 'react';

function useCurrentSong(){
    const [ isPlaying, setIsPlaying ] = useState(false); //true or false
    const [ currentSong, setCurrentSong ] = useState({
        playlistId: '',
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
        isFavorite: false,
    });

    //remove all, just save id and playlist id and check in the cahce the data needed

    return {currentSong, setCurrentSong, isPlaying, setIsPlaying};
};

export default useCurrentSong;