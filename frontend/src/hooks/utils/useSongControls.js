// This hook manages all song controls
// play/pause, playNext, playPrevious, repeat, shuffle

function useSongControls(audioRef, settings, setSettings, song) {

    const { 
        isPlaying, 
        setIsPlaying, 
        items, 
        currentSongRef, 
        setCurrentSongRef, 
        playlistId 
    } = song;

    const audio = audioRef?.current;

    function handlePlayPause(){
        if (!audio) return;
        setIsPlaying(!isPlaying);  
    };
    

      // Playback actions
    const playNext = () => {
        const index = items.findIndex((s) => s.id === currentSongRef?.id);
        const next = items[index + 1];
        if (next) setCurrentSongRef({ playlistId, id: next.id });
    };
    

    const playPrevious = () => {
        const index = items.findIndex((s) => s.id === currentSongRef?.id);
        const prev = items[index - 1];
        if (prev) setCurrentSongRef({ playlistId, id: prev.id });
    };
    

    const playRandom = () => {
        const otherSongs = items.filter((s) => s.id !== currentSongRef?.id);
        const list = otherSongs.length > 0 ? otherSongs : items;
        const random = list[Math.floor(Math.random() * list.length)];
        setCurrentSongRef({ playlistId, id: random.id });
    };
    

    const toggleSetting = (key) => {
        setSettings((prev) => ({
            ...prev,
            [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
        }));
    };


    function handleOnRepeat() {
        if (settings.isShufflePlaylist) {
            toggleSetting('isShufflePlaylist');
        }
        toggleSetting('isOnRepeat');
    };


    function handleShuffle() {
        if (settings.isOnRepeat) {
            toggleSetting('isOnRepeat');
        }
        toggleSetting('isShufflePlaylist');
    };


    return { 
        handlePlayPause,
        playNext,
        playPrevious,
        playRandom,
        handleOnRepeat,
        handleShuffle
    }
}

export default useSongControls;