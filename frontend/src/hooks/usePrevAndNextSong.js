import { useEffect, useMemo } from "react";

//define prev and next song info based on current song id and songs array
function usePrevAndNextSong(currentSong, songsList ){
    const items = songsList || null;

    const mapSongToObj = (song, index) => song ? {
        artistsName: song.artists,
        songName: song.name,
        id: song.id,
        img: song.imageUrl,
        duration_ms: song.duration_ms,
        albumName: song.albumOrShow?.name,
        external_ids: song.external_ids?.isrc || '',
        index,
    } : null;

    const nextSong = useMemo(() => {
        if (!currentSong || !items) return null;
        const currentIndex = items.findIndex(s => s.id === currentSong.id);
        const nextSongIndex = currentIndex + 1 < items.length ? currentIndex + 1 : null;
        
        return mapSongToObj(items[nextSongIndex], nextSongIndex);
    }, [currentSong, items]);

    const previousSong = useMemo(() => {
        if (!currentSong || !items) return null;
        const currentIndex = items.findIndex(s => s.id === currentSong.id);
        const prevSongIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : null;

        return mapSongToObj(items[prevSongIndex], prevSongIndex);
    }, [currentSong, items]);
    
    return { nextSong, previousSong };
};

export default usePrevAndNextSong;
