import { createContext, useContext, useMemo, useRef, useState } from 'react';
import useSongController from '../hooks/utils/useSongController';
import useSongControls from '../hooks/utils/useSongControls';
import useAudio from '../hooks/utils/useAudio';
import useSongProgress from '../hooks/utils/useSongProgress';
import useSongVolumeControls from '../hooks/utils/useSongVolumeControls';


const SongContext = createContext();
export function SongProvider({ children }) {

    const audioRef = useRef(null);
    const [settings, setSettings] = useState({
        isOnRepeat: false,
        isShufflePlaylist: false,
    });
     
    const song = useSongController(audioRef, settings);
    const songControls = useSongControls(audioRef, settings, setSettings, song);
    const audio = useAudio(settings, song, songControls.playNext, songControls.playRandom)
    const SongProgress = useSongProgress(audioRef, song);
    const songVolumeControls = useSongVolumeControls(audioRef);

    const value = useMemo(() => ({ 
        ...song,
        ...songControls,
        ...audio,
        ...SongProgress,
        ...songVolumeControls,
        settings, 
        setSettings, 
        audioRef 
    }), [song, settings]);


    return (
        <SongContext.Provider value={value}>
            {children}
        </SongContext.Provider>
    );
}

export function useSong() {
    return useContext(SongContext);
}