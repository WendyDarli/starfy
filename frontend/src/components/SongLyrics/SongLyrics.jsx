import { useOutletContext } from 'react-router';
import './SongLyrics.css';

function SongLyrics(){
    const { lyrics } = useOutletContext();  

    return(
        <div className='lyricsContainer'>
            {lyrics && lyrics.split('\n').map((line, i) => (
                <p className='lyricsLine' key={`${line}-${i}`}>{line}</p>
            )) || <p className='noLyrics'>We don't have the lyrics for this song yet.</p>}
        </div>
    )
}

export default SongLyrics;