import './SongInfo.css';
import defaultSongCover from '../../../assets/playlists_default_cover.png';
import useToggleFavoriteSong from '../../../hooks/ui/useToggleFavoriteSong';
import { useSong } from '../../../context/songContext';
import renderArtists from '../../../utils/renderArtists'
import usePlaylist from '../../../hooks/query/usePlaylist.js';

function SongInfo(){

    const { nowPlaying,  } = useSong();

    const img = nowPlaying?.imageUrl || defaultSongCover;
    const songId = nowPlaying?.id || null;
    const songName = nowPlaying?.name || 'No Song Playing';

    // Derive isFavorite from playlist data
    const { data: playlistInfo } = usePlaylist();
    const findSongInPlaylist = playlistInfo?.tracks?.items.find(s => s.id === songId);
    const isFavorite = findSongInPlaylist?.isFavorite;

    const { handleFavoriteToggle, isLoading } = useToggleFavoriteSong( isFavorite, songId );

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
                onClick={() => handleFavoriteToggle()}
                disabled={!nowPlaying?.id || isLoading}
            />        
        </div>
    );
}

export default SongInfo;