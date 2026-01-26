import { useOutletContext } from 'react-router';
import './SongLyrics.css';

function SongLyrics(){
    const { currentSong } = useOutletContext();
    return(
        <div>
        </div>
    )
}

export default SongLyrics;