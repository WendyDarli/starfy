async function getLyrics(currentSongData) {
    const durationSeconds =  Math.floor(currentSongData?.duration_ms / 1000);
    const params = new URLSearchParams({
                artist_name: currentSongData?.artists?.[0]?.name,
                track_name: currentSongData?.name,
                album_name: currentSongData?.album?.name,
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
