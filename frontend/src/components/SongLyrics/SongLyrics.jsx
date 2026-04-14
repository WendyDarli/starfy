import { useSong } from '../../context/songContext.jsx';
import useLyrics from '../../hooks/query/useLyrics.js';
import './SongLyrics.css';  

function SongLyrics(){
    
    const { nowPlaying } = useSong();
    const { data: lyrics, isError } = useLyrics(nowPlaying);


    return(
        <div className='lyricsContainer'>
            {isError || !lyrics ? (
                <p className='noLyrics'>We don't have the lyrics for this song yet.</p> 
            ) : (lyrics.split('\n').map((line, i) => (
                    <p className='lyricsLine' key={`${line}-${i}`}>{line}</p>
                ))
            )}
            
        </div>
    )
}

export default SongLyrics;