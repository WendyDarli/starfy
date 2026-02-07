import { useState, useEffect } from 'react';

function useCurrentSong(){
    const [ isPlaying, setIsPlaying ] = useState(false); //true or false
    const [ lyrics, setLyrics ] = useState(null); 
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

    const durationSeconds =  Math.floor(currentSong?.duration_ms / 1000);

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

    //fetch lyrics //move out
    useEffect(() => {
        const controller = new AbortController();
        setLyrics(null);

        if(currentSong?.id) {

            const params = new URLSearchParams({
                artist_name: currentSong?.artistsName?.[0]?.name,
                track_name: currentSong?.songName,
                album_name: currentSong?.albumName,
                duration: durationSeconds
            });

            fetch(`http://127.0.0.1:3000/lyrics?${params.toString()}`,{
            credentials: 'include',
            signal: controller.signal,
            })
            .then(res => {
                if(!res.ok) throw new Error('error fetching lyrics');
                return res.json();
            })
            .then(data => {
                setLyrics(data);
            }
            )
            .catch((err) => {
                if(err.name === 'AbortError') return;

                if(process.env.NODE_ENV !== 'production' ){
                    console.error('Fetch error:', err);
                }
                setLyrics(null);
            })
        }

        return () => controller.abort();
    }, [currentSong?.id]);


    return {currentSong, setCurrentSong, isPlaying, setIsPlaying, lyrics};
};

export default useCurrentSong;