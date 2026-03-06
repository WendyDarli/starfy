import { useState, useEffect } from "react";

// This hook manages the song progress bar on PlayerFooter
function useSongProgress(audioRef, song){
    const audio = audioRef.current;

    // Playback slider
    const [currTime, setCurrTime] = useState(0);
    const [newTime, setNewTime] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);


    // Slider values
    const [duration, setDuration] = useState(0);
    const currentDisplayTime = isSeeking ? newTime : currTime;
    const percent = duration > 0 ? (currentDisplayTime / duration) * 100 : 0;

    // Slider handlers
    const handleTimeUpdate = () => {
        if (!isSeeking && audio) setCurrTime(audio?.currentTime);
    };

    const handleSeekStart = () => setIsSeeking(true);
    const handleSeekChange = (e) => setNewTime(e.target.value);
    const handleSeekEnd = (value) => {
            if (audio) {
                audio.currentTime = value;
                }
        setCurrTime(value);
        setIsSeeking(false);
    };

    // update duration on metadata load
    useEffect(() => {
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [audioRef, song.currentSongRef]); // re-run when audio or song changes


    return {
        currTime,
        duration,
        newTime,
        isSeeking,
        percent,
        handleSeekStart,
        handleSeekChange,
        handleSeekEnd,
        handleTimeUpdate
    }
}

export default useSongProgress;