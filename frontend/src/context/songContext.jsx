import { createContext, useContext, useMemo, useRef, useState } from "react";
import useSongController from "../hooks/utils/useSongController";

const SongContext = createContext();
export function SongProvider({ children }) {

    const audioRef = useRef(null);
    const [settings, setSettings] = useState({
        isOnRepeat: false,
        isShufflePlaylist: false,
    });
     
    const song = useSongController(audioRef, settings, setSettings);

    const value = useMemo(() => ({ 
        ...song, 
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