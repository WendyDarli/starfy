import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

//define prev, next and shuffle song info based on current song id and songs array
function useSongControls( currentSong ){
    const playlistId = currentSong?.playlistId;

    //get songsList from tanstack cache
    const queryClient = useQueryClient();
    const data = playlistId ? queryClient.getQueryData(['playlist', playlistId]) : undefined;
    const songsList = data?.tracks?.items
    const items = songsList ?? [];


    const mapSongToObj = (song, index) => song ? {
        artistsName: song.artists,
        songName: song.name,
        id: song.id,
        img: song.imageUrl,
        duration_ms: song.duration_ms,
        albumName: song.albumOrShow?.name,
        external_ids: song.external_ids?.isrc || '',
        index,
        playlistId
    } : null;

    const getRandomSong = () => {
        if (!items || items.length === 0) return null;
        
        // Optional: Filter out the current song so you don't play the same one twice
        const otherSongs = items.filter(s => s.id !== currentSong?.id);
        const listToPickFrom = otherSongs.length > 0 ? otherSongs : items;
        
        const randomIndex = Math.floor(Math.random() * listToPickFrom.length);
        const song = listToPickFrom[randomIndex];
        
        // Find the original index in the full items array
        const originalIndex = items.findIndex(s => s.id === song.id);
        
        return mapSongToObj(song, originalIndex);
    };

    const nextSong = useMemo(() => {
        if (!currentSong || !items) return null;
        const currentIndex = items.findIndex(s => s.id === currentSong.id);
        if (currentIndex === -1) return null;
        const nextSongIndex = currentIndex + 1 < items.length ? currentIndex + 1 : null;
        
        return mapSongToObj(items[nextSongIndex], nextSongIndex);
    }, [currentSong, items]);

    const previousSong = useMemo(() => {
        if (!currentSong || !items) return null;
        const currentIndex = items.findIndex(s => s.id === currentSong.id);
        const prevSongIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : null;

        return mapSongToObj(items[prevSongIndex], prevSongIndex);
    }, [currentSong, items]);

    return { nextSong, previousSong, getRandomSong };
};

export default useSongControls;
