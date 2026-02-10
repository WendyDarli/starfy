async function getLyrics(currentSong) {
    const durationSeconds =  Math.floor(currentSong?.duration_ms / 1000);
    const params = new URLSearchParams({
                artist_name: currentSong?.artistsName?.[0]?.name,
                track_name: currentSong?.songName,
                album_name: currentSong?.albumName,
                duration: durationSeconds
            });

    const response = await fetch(`http://127.0.0.1:3000/lyrics?${params.toString()}`,
                    { credentials: 'include' }
                );
    const data = await response.json();
   
   if(data?.error){
        throw new Error(data.error);
    }
    return data;
};

export default getLyrics;
