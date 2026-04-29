async function getLyrics(nowPlaying) {
    const baseUrl = import.meta.env.VITE_API_URL;
    const durationSeconds =  Math.floor(nowPlaying?.duration_ms / 1000);
    const params = new URLSearchParams({
                artist_name: nowPlaying?.artists?.[0]?.name,
                track_name: nowPlaying?.name,
                album_name: nowPlaying?.album?.name,
                duration: durationSeconds
            });

    const response = await fetch(`${baseUrl}/lyrics?${params.toString()}`,
                    { credentials: 'include' }
                );
    const data = await response.json();
   
   if(data?.error){
        throw new Error(data.error);
    }
    return data;
};

export default getLyrics;
