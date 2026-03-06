import { useState, useRef, useEffect } from "react";


function useSongVolumeControls(audioRef){
    const audio = audioRef.current;

    const [volumeLevel, setVolumeLevel] = useState(0.5);
    const previousVolume = useRef(volumeLevel); //remember value before mute

    useEffect(() => {
        if(!audio) return;
        audio.volume = volumeLevel;

    }, [volumeLevel]);


    function handleVolumeChange(e) {
        setVolumeLevel(parseFloat(e.target.value));
    };


    function muteSong() {
        if(!audio) return;
        if(volumeLevel > 0) {
            previousVolume.current = volumeLevel;
            setVolumeLevel(0);
        } else {
            setVolumeLevel(previousVolume.current);
        }
    };

    return {
        volumeLevel,
        handleVolumeChange,
        muteSong
    }
}

export default useSongVolumeControls