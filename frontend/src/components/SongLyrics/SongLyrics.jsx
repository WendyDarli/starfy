import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import './SongLyrics.css';

function SongLyrics(){
    const [lyrics, setLyrics] = useState([]);
    const { currentSong } = useOutletContext();
    const durationSeconds =  Math.floor(currentSong.duration_ms / 1000);
    
    function convertTimeToSeconds(time){
        const parts = time.split(':');
        const seconds = parseFloat(parts.pop());
        const minutes = parts.length > 0 ? parseFloat(parts.pop()) * 60 : 0;
        const hours = parts.length > 0 ? parseFloat(parts.pop()) * 3600 : 0;

        return hours + minutes + seconds;
    };

    function formatSyncedLyrics(convertTimeToSeconds){
        if(!lyrics?.synced) return;
       
        const lyricLines = lyrics?.synced.split('\n').filter(l => l.trim());

        return lyricLines.map((line, i) => {
            const [rawTime, rawLine] = line.split(']');
            const cleanTime = rawTime.replace('[', '')

            return {
                timeStamp: convertTimeToSeconds(cleanTime),
                line: rawLine?.trim() || '',
            };
        });
    };

    const formatSyncedLyricsArray = formatSyncedLyrics(convertTimeToSeconds);

    useEffect(() => {
        if (!currentSong?.name) return;
        const params = new URLSearchParams({
            artist_name: currentSong?.artistsName?.[0].name,
            track_name: currentSong?.name,
            album_name: currentSong?.albumName,
            duration: durationSeconds
        });

        fetch(`http://127.0.0.1:3000/lyrics?${params.toString()}`,{
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {
            if(!res.ok) throw new Error('prob no lyrics');
            return res.json();
        })
        .then(data => setLyrics(data))
        .catch((err) => console.error(err))
        
    }, [currentSong]);
    

    return(
        <div>
            {lyrics?.synced && formatSyncedLyricsArray?.map((obj, i) => {
                console.log('arrline: ', obj.line);
                console.log('arrtimestamp: ', obj.timeStamp);
                return (
                    <p key={obj.timeStamp}>{obj.line}</p>
                )})}


            {lyrics?.plain && lyrics?.plain?.split('\n').map((line, i) => (
                <p key={`${line}-${i}`}>{line}</p>
            )) || 'We don\'t have the lyrics for this song yet.'}
        </div>
    )
}

export default SongLyrics;