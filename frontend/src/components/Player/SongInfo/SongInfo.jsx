import './SongInfo.css';
import defaultSongCover from '../../../assets/playlists_default_cover.png';
import useToggleFavoriteSong from '../../../hooks/ui/useToggleFavoriteSong';
import { useSong } from '../../../context/songContext';
import renderArtists from '../../../utils/renderArtists'

function SongInfo(){

    const { currentSongData } = useSong();

    const img = currentSongData?.imageUrl || defaultSongCover;
    const songId = currentSongData?.id || null;
    const songName = currentSongData?.name || 'No Song Playing';
    const isFavorite = currentSongData?.isFavorite;
    
    const { handleFavoriteToggle, isLoading } = useToggleFavoriteSong(  isFavorite, songId );

    return(
        <div id='songInfoContainer'>
            <img src={img} alt='Song Cover' className='songCover' />
            
            <div className='songInfo'>
                <p id='songName'>{songName}</p>
                {renderArtists(currentSongData?.artists)}
            </div> 

            <button 
                aria-label='Like Song' 
                className={`noBgBttn ${isFavorite ? 'likedBttn' : 'likeBttn'}`}
                onClick={() => handleFavoriteToggle()}
                disabled={!currentSongData?.id || isLoading}
            />        
        </div>
    );
}

export default SongInfo;