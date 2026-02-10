import { useOutletContext } from 'react-router';
import useLyrics from '../../hooks/useLyrics.js';
import './SongLyrics.css';  

function SongLyrics(){
    const currentSong = useOutletContext().currentSong;
    const { data: lyrics, isError } = useLyrics(currentSong);

    return(
        <div className='lyricsContainer'>
            {isError && <p className='noLyrics'>We don't have the lyrics for this song yet.</p>}
            {lyrics && lyrics.split('\n').map((line, i) => (
                <p className='lyricsLine' key={`${line}-${i}`}>{line}</p>
            )) || <p className='noLyrics'>We don't have the lyrics for this song yet.</p>}
        </div>
    )
}

export default SongLyrics;