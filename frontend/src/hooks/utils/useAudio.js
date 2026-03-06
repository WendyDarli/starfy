import { useCallback } from "react";

// This hook is for the audio DOM element
function useAudio(settings, song, playNext, playRandom){
    
    const handleAudioEnded = useCallback(() => {
        if (settings.isShufflePlaylist) {
            playRandom();
        } else {
            playNext();
        }
    }, [settings, song.items, song.currentSongRef]); 

    return {
        handleAudioEnded
    }
};

export default useAudio