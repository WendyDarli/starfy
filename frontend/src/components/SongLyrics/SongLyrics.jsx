import { useOutletContext } from 'react-router';
import './SongLyrics.css';

function SongLyrics(){
    const { lyrics } = useOutletContext();  

    return(
        <div className='lyricsContainer'>
        </div>
    )
}

export default SongLyrics;