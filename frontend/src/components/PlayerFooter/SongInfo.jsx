import defaultSongCover from '../../assets/playlists_default_cover.png';
import useToggleFavoriteSong from '../../hooks/ui/useToggleFavoriteSong';
import useUrlParams from '../../hooks/utils/useUrlParams';

//this is reusable extract later
function renderArtists(artists = []){
    return artists.map((a, i) => ( 
        <p key={a.id} id='songArtist'>
            {a.name}
            {i < artists.length - 1 && ', '}
        </p>  
    ));
};

function SongInfo({ currentSong, setCurrentSong }){
    const img = currentSong?.img || defaultSongCover;
    const songName = currentSong?.songName || 'No Song Playing';
    const songId = currentSong?.id || null;
    const isFavorite = currentSong.isFavorite;
  
    const { handleFavoriteToggle, isLoading } = useToggleFavoriteSong(  isFavorite, songId );

    function handleFavoriteClick(){
        handleFavoriteToggle();
        setCurrentSong(prev => ({
            ...prev,
            isFavorite: !prev.isFavorite
        }))
    };

    return(
        <div id='songInfoContainer'>
            <img src={img} alt='Song Cover' className='songCover' />
            
            <div className='songInfo'>
                <p id='songName'>{songName}</p>
                {renderArtists(currentSong?.artistsName)}
            </div> 

            <button 
                aria-label='Like Song' 
                className={`noBgBttn ${isFavorite ? 'likedBttn' : 'likeBttn'}`}
                onClick={handleFavoriteClick}
                disabled={!currentSong.id || isLoading}
            />        
        </div>
    );
}

export default SongInfo;