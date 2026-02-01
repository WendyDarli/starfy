import { useState, useEffect } from 'react';

function useCurrentSong(){
    const [ isPlaying, setIsPlaying ] = useState(false); //true or false
    const [ currentSong, setCurrentSong ] = useState({
        artistsName: [],
        songName: '',
        id: '',
        img: '',
        duration_ms: 0,
        albumName: '',
        external_ids: '',
        audioUrl: null,
    });

    const durationSeconds =  Math.floor(currentSong.duration_ms / 1000);

    // fetch song audio url
    useEffect(() => {
        const isrc = currentSong?.external_ids;
        if (!isrc) return;
        fetch(`http://127.0.0.1:3000/song/${isrc}/audio`, { 
            credentials: 'include' 
        })
        .then(res => {
            if (!res.ok) throw new Error("Error fetching audio data");
            return res.json();
        })
        .then(data => { setCurrentSong(prev => ({...prev, audioUrl: data })) })
        .catch(err => console.error("Fetch audio url error in hook: ", err));
    }, [currentSong?.id]);



    return {currentSong, setCurrentSong, isPlaying, setIsPlaying};
};

export default useCurrentSong;