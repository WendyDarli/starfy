import './LyricsButton.css'

import { useSong } from '../../../context/songContext.jsx';
import useLyrics from '../../../hooks/query/useLyrics.js';
import { useNavigate, useLocation } from 'react-router';


function LyricsButton(){

    const navigate = useNavigate();
    const location = useLocation();
    const isLyricsPage = location.pathname === '/lyrics';

    const { currentSongData } = useSong();


    //fetchLyrics
    const { data: lyrics } = useLyrics(currentSongData);

    const shouldDisableLyricsButton = !lyrics && !isLyricsPage;
    const handleLyricsPath = () => {
        if (isLyricsPage) navigate(-1);
            else navigate('/lyrics');
    };

    const lyricsClassName = `lyrics noBgBttn ${
            isLyricsPage ? 'active' : ''
        } ${shouldDisableLyricsButton ? 'disabled' : ''}`
    
    return (
         <button
          disabled={shouldDisableLyricsButton}
          aria-label='open song lyrics'
          className={lyricsClassName}
          onClick={handleLyricsPath}
        />
    )
}

export default LyricsButton;