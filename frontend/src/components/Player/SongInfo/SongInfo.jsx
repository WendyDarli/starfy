import './SongInfo.css';
import toast from "react-hot-toast";
import defaultSongCover from '../../../assets/playlists_default_cover.png';
import useToggleFavoriteSong from '../../../hooks/ui/useToggleFavoriteSong';
import { useSong } from '../../../context/songContext';
import renderArtists from '../../../utils/renderArtists'
import useLikedSongs from '../../../hooks/query/useLikedSongs';

function SongInfo(){

    const { nowPlaying } = useSong();

    const img = nowPlaying?.imageUrl || defaultSongCover;
    const songId = nowPlaying?.id || null;
    const songName = nowPlaying?.name || 'Nothing Playing';

    // Check if song is in liked songs
    const { data: likedSongs } = useLikedSongs();
    const isFavorite = likedSongs?.tracks?.items?.some(song => song.id === songId);

    const { handleFavoriteToggle, isLoading } = useToggleFavoriteSong( isFavorite, songId );

    function handleLiked(){
        const result = handleFavoriteToggle();

        if(result === 'added'){
            toast.success('Added to favorites');
        }
        if(result === 'removed'){
            toast('Removed from favorites');
        }
    }

    return(
        <div id='songInfoContainer'>
            <img src={img} alt='Song Cover' className='songCover' />
            
            <div className='songInfo'>
                <p id='songName'>{songName}</p>
                {renderArtists(nowPlaying?.artists)}
            </div> 

            <button 
                aria-label='Like Song' 
                className={`noBgBttn ${isFavorite ? 'likedBttn' : 'likeBttn'}`}
                onClick={() => handleLiked()}
                disabled={!nowPlaying?.id || isLoading}
            />        
        </div>
    );
}

export default SongInfo;