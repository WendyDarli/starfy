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
        audioUrl: undefined,
        index: null,
        isLoadingAudio: false,
    });

    // fetch song audio url //move out
        useEffect(() => {
            const isrc = currentSong?.external_ids;
            setCurrentSong(prev => ({ ...prev, isLoadingAudio: true }));
            if (!isrc) return;
            fetch(`http://127.0.0.1:3000/song/${isrc}/audio`, { 
                credentials: 'include' 
            })
            .then(res => {
                if (!res.ok) throw new Error("Error fetching audio data");
                if (res.status === 204 || res.headers.get("content-length") === "0") {
                    return null; 
                }
                return res.json();
            })
            .then(data => { setCurrentSong(prev => ({...prev, audioUrl: data, isLoadingAudio: false })) })
            .catch(err => {
                console.error("Fetch audio url error in hook: ", err)
                setCurrentSong(prev => ({...prev, audioUrl: null, isLoadingAudio: false }));
            });
        }, [currentSong?.id]);


    return {currentSong, setCurrentSong, isPlaying, setIsPlaying};
};

export default useCurrentSong;